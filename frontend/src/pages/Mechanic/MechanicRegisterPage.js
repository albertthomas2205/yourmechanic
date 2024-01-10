import React from 'react'
import MechanicRegister from '../../components/mechanic/MechanicRegister'
import HeaderUser from '../../components/user/Headeruser'

const MechanicRegisterPage = () => {
  return (
    <div>
    <div className=" w-full z-30  p-4 fixed-top  bg-[#180e32]  ">
        <HeaderUser />
      </div>

      <div>
        <MechanicRegister/>
      </div>

    </div>
  )
}

export default MechanicRegisterPage