import React from 'react'
import SettingsTable from './seetings-table'
import Icon from '../../../assets/icon'

function Settings() {
  return (
    <>
    <div className="bg-[#459BDA] h-[80px] flex justify-between px-10 py-7">
      <h3 className="text-[16px] font-semibold text-white">Agents</h3>
      <button>
        <Icon name="bellicon" />
      </button>
    </div>

    <div className="flex justify-between w-full px-10 py-14">
      <div className="border-2 rounded-md solid pl-5 bg-transparent h-[45px] flex gap-3">
        <Icon name="searchIcon" className="mt-3 rounded" />
        <input
          className="outline-none border-none bg-transparent"
          id="input-placeholder"
          placeholder="Search user"
          //   value={searchQuery}
          //   onChange={handleSearchChange}
        />
      </div>

      <section className="flex gap-4">
      <button
          className=" custom-select flex gap-4 border px-5 py-3 bg-[#459BDA] text-[#fff] text-[14px] font-semibold rounded-md border-[#459BDA]"
        >
         Add new user
         <Icon name='addicon' />
        </button>

        <select
          className=" custom-select border px-3 py-1 bg-[#fff] text-[#459BDA] text-[14px] font-semibold rounded-full border-[#459BDA]"
          // value={selectedStatus}
          // onChange={handleStatusChange}
        >
          <option value="">Type</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
          <option value="inactive">Inactive</option>
          <option value="blocked">Blocked</option>
        </select>

        <select
          className="border text-[14px] font-semibold px-3 py-1 bg-[#fff] text-[#459BDA] rounded-full border-[#459BDA]"
          // value={selectedStatus}
          // onChange={handleStatusChange}
        >
          <option value="">Status</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
          <option value="inactive">Inactive</option>
          <option value="blocked">Blocked</option>
        </select>

      </section>
    </div>

    <SettingsTable />
  </>
  )
}

export default Settings