import { signIn, signOut, useSession } from 'next-auth/react'
import Form from './Form'

export default function Navbar() {
  const { data: sessionData } = useSession()

  return (
    <div className="navbar bg-primary text-primary-content">
      <div className="flex-1 pl-5 text-xl font-bold">Medical Bills</div>
      <div className="p-3">
        <Form />
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown-end dropdown">
          {sessionData?.user ? (
            <div>
              <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
                <div className="w-10 rounded-full">
                  <img
                    src={sessionData?.user?.image ?? ''}
                    alt={sessionData?.user?.name ?? ''}
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="w-30 dropdown-content menu rounded-box menu-sm z-[1] mt-3 bg-base-100 p-2 shadow"
              >
                <li>
                  <a onClick={() => void signOut()}>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <button
              className="btn-ghost rounded-btn btn"
              onClick={() => void signIn()}
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
