import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import ClickOutside from '../ClickOutside';

const DropdownCard = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
    <li>
      <Link
        onClick={() => {
          setDropdownOpen(!dropdownOpen);
        }}
        to="#"
        className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
        </svg>
      </Link>

      {dropdownOpen && (
        <div
          className={`absolute -right-27 mt-2.5 flex flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80`}
        >
          <ul className="flex h-auto flex-col overflow-y-auto">
            <li>
              <Link
                className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                to="/card/new"
              >
                <p className="text-sm">
                  <span className="text-black dark:text-white">
                    Add Card
                  </span>{' '}
                </p>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </li>
  </ClickOutside>
  )
}

export default DropdownCard