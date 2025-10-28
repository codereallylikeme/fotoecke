'use client'

import React from 'react'
import { registerUser } from '@/actions/auth' // ensure this path matches your server action

export default function RegisterForm({ isAdmin = false }: { isAdmin?: boolean }) {
  return (
    <form action={registerUser} className='space-y-6' method='post'>
      <div>
        <label className='block mb-2'>Email</label>
        <input
          name='email'
          type='email'
          required
          className='w-full border px-3 py-2 rounded'
        />
      </div>

      <div>
        <label className='block mb-2'>Password</label>
        <input
          name='password'
          type='password'
          required
          className='w-full border px-3 py-2 rounded'
        />
      </div>

      {isAdmin && (
        <div>
          <label className='block mb-2'>Role</label>
          <select name='role' className='w-full border px-3 py-2 rounded' defaultValue='staff'>
            <option value='staff'>Staff</option>
            <option value='admin'>Admin</option>
          </select>
        </div>
      )}

      <button type='submit' className='w-full bg-primary text-white py-2 rounded'>
        Register
      </button>
    </form>
  )
}
