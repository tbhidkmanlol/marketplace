'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getCurrentUser, updateProfile, updatePassword, uploadAvatar, updateEmail } from '@/lib/auth'
import { AuthUser } from '@/lib/auth'

export default function ProfileEditPage() {
    const router = useRouter()
    const [user, setUser] = useState<AuthUser | null>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    // Form state
    const [username, setUsername] = useState('')
    const [dob, setDob] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [avatarFile, setAvatarFile] = useState<File | null>(null)
    const [avatarPreview, setAvatarPreview] = useState('')

    // Load user data on mount
    useEffect(() => {
        async function loadUser() {
            try {
                const currentUser = await getCurrentUser()
                if (!currentUser) {
                    router.push('/auth')
                    return
                }
                setUser(currentUser)
                setUsername(currentUser.username)
                setDob(currentUser.dob || '')
                setAvatarPreview(currentUser.avatar_url || '')
            } catch (err) {
                setError('Failed to load user data')
            } finally {
                setLoading(false)
            }
        }
        loadUser()
    }, [router])

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setAvatarFile(file)
            // Preview
            const reader = new FileReader()
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleProfileSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!user) return

        setSaving(true)
        setError('')
        setSuccess('')

        try {
            // Upload avatar if changed
            if (avatarFile) {
                await uploadAvatar(user.id, avatarFile)
            }

            // Update profile
            await updateProfile(user.id, {
                username,
                dob,
            })

            setSuccess('Profile updated successfully!')
            setUser({ ...user, username, dob, avatar_url: avatarPreview })
            setAvatarFile(null)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update profile')
        } finally {
            setSaving(false)
        }
    }

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match')
            return
        }

        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters')
            return
        }

        setSaving(true)
        setError('')
        setSuccess('')

        try {
            // Verify current password and update to new password
            await updatePassword(currentPassword, newPassword)
            setSuccess('✅ Password updated successfully!')
            setCurrentPassword('')
            setNewPassword('')
            setConfirmPassword('')
        } catch (err) {
            setError(err instanceof Error ? err.message : '❌ Failed to update password')
        } finally {
            setSaving(false)
        }
    }

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!newEmail) {
            setError('Please enter a new email')
            return
        }

        setSaving(true)
        setError('')
        setSuccess('')

        try {
            await updateEmail(newEmail)
            setSuccess('✅ Confirmation email sent! Check your inbox.')
            setNewEmail('')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update email')
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center">
                <div className="text-white">Loading...</div>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center">
                <div className="text-white">Please sign in first</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/" className="text-slate-400 hover:text-slate-300 text-sm transition">
                        ← Back to Home
                    </Link>
                    <h1 className="text-4xl font-bold text-white mt-4">Profile Settings</h1>
                    <p className="text-slate-400 mt-2">Manage your account details and preferences</p>
                </div>

                {/* Success/Error Messages */}
                {success && (
                    <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-400 rounded-lg">
                        {success}
                    </div>
                )}
                {error && (
                    <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 rounded-lg">
                        {error}
                    </div>
                )}

                {/* Profile Edit Form */}
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-8 mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Edit Profile</h2>

                    <form onSubmit={handleProfileSubmit} className="space-y-6">
                        {/* Avatar */}
                        <div>
                            <label htmlFor="avatar-upload" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                                Profile Picture
                            </label>
                            <div className="flex items-center gap-6">
                                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-4xl overflow-hidden">
                                    {avatarPreview ? (
                                        <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                                    ) : (
                                        '👤'
                                    )}
                                </div>
                                <input
                                    id="avatar-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                    title="Upload a profile picture"
                                    className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
                                />
                            </div>
                        </div>

                        {/* Username */}
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            />
                        </div>

                        {/* Date of Birth */}
                        <div>
                            <label htmlFor="dob" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                Date of Birth
                            </label>
                            <input
                                id="dob"
                                type="date"
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="current-email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                Current Email
                            </label>
                            <input
                                id="current-email"
                                type="email"
                                value={user.email}
                                disabled
                                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white opacity-50 cursor-not-allowed"
                            />
                        </div>

                        {/* New Email */}
                        <div>
                            <label htmlFor="new-email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                New Email
                            </label>
                            <input
                                id="new-email"
                                type="email"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                placeholder="Enter new email address"
                                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            />
                            <p className="text-xs text-slate-500 mt-1">We'll send a confirmation link to your new email</p>
                        </div>

                        {/* Submit Email Change */}
                        <button
                            type="button"
                            onClick={handleEmailSubmit}
                            disabled={saving}
                            className="w-full py-2 bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white font-medium rounded-lg transition duration-200"
                        >
                            {saving ? 'Updating...' : 'Change Email'}
                        </button>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={saving}
                            className="w-full py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition duration-200"
                        >
                            {saving ? 'Saving...' : 'Save Profile Changes'}
                        </button>
                    </form>
                </div>

                {/* Password Change Form */}
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-8">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Change Password</h2>

                    <form onSubmit={handlePasswordSubmit} className="space-y-6">
                        {/* Current Password */}
                        <div>
                            <label htmlFor="current-password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                Current Password
                            </label>
                            <input
                                id="current-password"
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                required
                            />
                        </div>

                        {/* New Password */}
                        <div>
                            <label htmlFor="new-password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                New Password
                            </label>
                            <input
                                id="new-password"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                required
                            />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="confirm-password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                Confirm New Password
                            </label>
                            <input
                                id="confirm-password"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                required
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={saving}
                            className="w-full py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition duration-200"
                        >
                            {saving ? 'Updating...' : 'Update Password'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
