import { supabase } from './supabase'

export interface OrderInsertData {
    orderNumber: string
    customerName: string
    customerEmail: string
    customerPhone: string
    customerAddress: string
    paymentMethod: string
    bankOption?: string
    ewalletOption?: string
    items: Array<{
        productId: number
        productName: string
        unitPrice: number
        quantity: number
    }>
    subtotal: number
    discountCode?: string
    discountPercent?: number
    totalPrice: number
}

/**
 * Insert an order and its items into Supabase
 * Returns the order ID if successful, throws error if fails
 */
export async function insertOrder(data: OrderInsertData): Promise<string> {
    try {
        console.log('📝 Inserting order with data:', data)

        // Step 1: Insert the main order
        const { data: orderData, error: orderError } = await supabase
            .from('orders')
            .insert({
                order_number: data.orderNumber,
                customer_name: data.customerName,
                customer_email: data.customerEmail,
                customer_phone: data.customerPhone,
                customer_address: data.customerAddress,
                payment_method: data.paymentMethod,
                bank_option: data.bankOption || null,
                ewallet_option: data.ewalletOption || null,
                subtotal: data.subtotal,
                discount_code: data.discountCode || null,
                discount_percent: data.discountPercent || null,
                total_price: data.totalPrice,
                status: 'pending'
            })
            .select('id')
            .single()

        if (orderError) {
            console.error('❌ Order insert error:', orderError)
            throw new Error(`Failed to insert order: ${orderError.message}`)
        }

        console.log('✅ Order inserted with ID:', orderData.id)

        const orderId = orderData.id

        // Step 2: Insert order items
        const orderItems = data.items.map(item => ({
            order_id: orderId,
            product_id: item.productId,
            product_name: item.productName,
            unit_price: item.unitPrice,
            quantity: item.quantity,
            subtotal: item.unitPrice * item.quantity
        }))

        console.log('📝 Inserting order items:', orderItems)

        const { error: itemsError } = await supabase
            .from('order_items')
            .insert(orderItems)

        if (itemsError) {
            console.error('❌ Order items insert error:', itemsError)
            throw new Error(`Failed to insert order items: ${itemsError.message}`)
        }

        console.log('✅ Order items inserted successfully')

        // Step 3: Update stock quantities for each product
        for (const item of data.items) {
            // Get current stock
            const { data: product } = await supabase
                .from('products')
                .select('stock_qty')
                .eq('id', item.productId)
                .single()

            if (product) {
                const newStock = product.stock_qty - item.quantity
                const { error: stockError } = await supabase
                    .from('products')
                    .update({ stock_qty: newStock })
                    .eq('id', item.productId)

                if (stockError) {
                    console.warn('⚠️ Stock update warning for product', item.productId, ':', stockError.message)
                } else {
                    console.log(`📊 Stock updated for product ${item.productId}: ${product.stock_qty} → ${newStock}`)
                }
            }
        }

        return orderId
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        console.error('Order insertion error:', errorMessage)
        throw error
    }
}

/**
 * Get all orders for a customer by email
 */
export async function getOrdersByEmail(email: string) {
    try {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('customer_email', email)
            .order('created_at', { ascending: false })

        if (error) {
            throw new Error(`Failed to fetch orders: ${error.message}`)
        }

        return data
    } catch (error) {
        console.error('Error fetching orders:', error)
        throw error
    }
}

/**
 * Get a specific order and its items by order number
 */
export async function getOrderWithItems(orderNumber: string) {
    try {
        // Get the order
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .select('*')
            .eq('order_number', orderNumber)
            .single()

        if (orderError) {
            throw new Error(`Failed to fetch order: ${orderError.message}`)
        }

        // Get the order items
        const { data: items, error: itemsError } = await supabase
            .from('order_items')
            .select('*')
            .eq('order_id', order.id)

        if (itemsError) {
            throw new Error(`Failed to fetch order items: ${itemsError.message}`)
        }

        return { order, items }
    } catch (error) {
        console.error('Error fetching order with items:', error)
        throw error
    }
}
