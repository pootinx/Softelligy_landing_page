import React from 'react'
'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '@/lib/firebase'
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser)
            setLoading(false)
        })
        return () => unsubscribe()
    }, [])

    const signOut = async() => {
        try {
            await firebaseSignOut(auth)
            router.push('/admin/login')
        } catch (error) {
            console.error('Erreur:', error)
        }
    }

    return React.createElement(
        AuthContext.Provider, { value: { user, loading, signOut } },
        children
    )
}

export const useAuth = () => useContext(AuthContext)