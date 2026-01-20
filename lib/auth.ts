import { supabase } from './supabase'

export interface AuthUser {
    id: string
    email: string
    username: string
    full_name?: string
    dob?: string
    avatar_url?: string
    shipping_address?: string
}

export interface SignUpPayload {
    email: string
    password: string
    username: string
    full_name?: string
}

export interface SignInPayload {
    email: string
    password: string
}

/**
 * Check if username is available
 */
export async function isUsernameAvailable(username: string): Promise<boolean> {
    const { count, error } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('username', username)

    if (error) {
        console.error('Error checking username:', error)
        return false
    }

    return (count ?? 0) === 0
}

/**
 * Sign up a new user
 */
export async function signUp(payload: SignUpPayload) {
    const { email, password, username, full_name } = payload

    // Check if username is available first
    const available = await isUsernameAvailable(username)
    if (!available) {
        throw new Error('Username is already taken')
    }

    // 1. Create auth user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
    })

    if (authError) {
        throw new Error(authError.message)
    }

    if (!authData.user) {
        throw new Error('Sign up failed')
    }

    // 2. Create profile in profiles table (manually, not via trigger)
    const { error: profileError } = await supabase
        .from('profiles')
        .insert({
            id: authData.user.id,
            email,
            username: username || email.split('@')[0],
            full_name: full_name || '',
        })

    if (profileError) {
        console.error('Profile creation failed:', profileError)
        throw new Error(`Failed to create profile: ${profileError.message}`)
    }

    return authData.user
}

/**
 * Sign in an existing user
 */
export async function signIn(payload: SignInPayload) {
    const { email, password } = payload

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        throw new Error(error.message)
    }

    return data.user
}

/**
 * Sign out current user
 */
export async function signOut() {
    const { error } = await supabase.auth.signOut()

    if (error) {
        throw new Error(error.message)
    }
}

/**
 * Get current authenticated user
 */
export async function getCurrentUser() {
    const { data, error } = await supabase.auth.getUser()

    if (error || !data.user) {
        return null
    }

    // Fetch user profile data
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single()

    // If profile doesn't exist, create it
    if (profileError && profileError.code === 'PGRST116') {
        try {
            const { error: insertError } = await supabase
                .from('profiles')
                .insert({
                    id: data.user.id,
                    email: data.user.email || '',
                    username: data.user.email?.split('@')[0] || 'user',
                    full_name: '',
                    dob: null,
                    shipping_address: '',
                    avatar_url: '',
                })

            if (insertError) {
                console.error('Failed to create profile:', insertError)
                return null
            }

            // Fetch the newly created profile
            const { data: newProfile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', data.user.id)
                .single()

            return {
                id: data.user.id,
                email: data.user.email || '',
                username: newProfile?.username || 'user',
                full_name: newProfile?.full_name,
                dob: newProfile?.dob,
                avatar_url: newProfile?.avatar_url,
                shipping_address: newProfile?.shipping_address,
            }
        } catch (err) {
            console.error('Error creating profile:', err)
            return null
        }
    }

    if (profileError) {
        console.error('Error fetching profile:', profileError)
        return null
    }

    return {
        id: data.user.id,
        email: data.user.email || '',
        username: profile.username,
        full_name: profile.full_name,
        dob: profile.dob,
        avatar_url: profile.avatar_url,
        shipping_address: profile.shipping_address,
    }
}

/**
 * Update user profile
 */
export async function updateProfile(userId: string, updates: Partial<AuthUser>) {
    // Update profiles table
    const { error: profileError } = await supabase
        .from('profiles')
        .update({
            ...(updates.username && { username: updates.username }),
            ...(updates.full_name && { full_name: updates.full_name }),
            ...(updates.dob && { dob: updates.dob }),
            ...(updates.avatar_url && { avatar_url: updates.avatar_url }),
            ...(updates.shipping_address && { shipping_address: updates.shipping_address }),
        })
        .eq('id', userId)

    if (profileError) {
        throw new Error(profileError.message)
    }

    // Update auth user metadata if username or full_name changed
    if (updates.username || updates.full_name) {
        const { error: authError } = await supabase.auth.updateUser({
            data: {
                ...(updates.username && { username: updates.username }),
                ...(updates.full_name && { full_name: updates.full_name }),
            },
        })

        if (authError) {
            throw new Error(authError.message)
        }
    }
}

/**
 * Update user password
 */
export async function updatePassword(currentPassword: string, newPassword: string) {
    // Get current user's email (hint: supabase.auth.getUser())
    const { data, error } = await supabase.auth.getUser()
    if (error || !data.user) {
        throw new Error("Please sign in first.")
    }
    const email = data.user.email
    if (!email) {
        throw new Error('❌ Email not found')
    }
    // Re-authenticate with email + currentPassword
    const { error: reAuthError } = await supabase.auth.signInWithPassword({
        email,
        password: currentPassword,
    })
    // If re-auth fails, throw error about wrong password
    if (reAuthError) {
        throw new Error("❌ Wrong password. Please try again.")
    }

    // If it succeeds, update the password
    const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
    })

    if (updateError) {
        throw new Error(updateError.message)
    }
    // Return success
    return "✅ Password updated successfully."
}

/**
 * Update user email
 */
export async function updateEmail(newEmail: string) {
    const { error } = await supabase.auth.updateUser({
        email: newEmail,
    })

    if (error) {
        throw new Error(error.message)
    }

    return "✅ Confirmation email sent. Please check your email to confirm the change."
}

/**
 * Upload user avatar
 */
export async function uploadAvatar(userId: string, file: File) {
    const fileName = `${userId}-${Date.now()}.jpg`

    // Upload file to storage
    const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, { upsert: true })

    if (uploadError) {
        throw new Error(uploadError.message)
    }

    // Get public URL
    const { data } = supabase.storage.from('avatars').getPublicUrl(fileName)

    // Update profile with avatar URL
    await updateProfile(userId, { avatar_url: data.publicUrl })

    return data.publicUrl
}





