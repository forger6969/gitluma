import React from 'react'
import { useTranslation } from 'react-i18next'
import git from "../assets/SVG.png"
import icon from "../assets/Icon.png"
import last from "../assets/Container.png"
import notification from "../assets/Container (1).png"

const WorkSpace = () => {
    const { t } = useTranslation()

    return (
        <div className='bg-[#10141A]'>
            <div id="container" className='max-w-full w-[90%] mx-auto py-[70px] '>
                <h1 className='font-[900] text-[30px] text-[#DFE2EB] '>{t("workspace_title")}</h1>
                <p className='font-[400] text-[#C8C4D6] text-[16px] mt-2.5 '>{t("workspace_subtitle")}</p>
                <div id="card-1" className='p-[32px] bg-[#181C22] rounded-2xl flex flex-col gap-[30px] '>
                    <div className='flex justify-between items-start'>
                        <div className=' '>
                            <p className='font-[700] text-[18px] text-[#DFE2EB] '>{t("workspace_github_conn")}</p>
                            <p className=' font-normal text-[14px] text-[#C8C4D6]'>{t("workspace_github_conn_desc")}</p>
                        </div>
                        <ul className='py-[6px] pr-[12px] pl-[30px] bg-[#0067D733] w-[115px] rounded-2xl flex justify-center items-center'>
                            <li className=' list-disc text-[#ADC6FF] '>{t("workspace_connected")}</li>
                        </ul>
                    </div>

                    <div className='bg-[#262A31] py-[22px] px-[25px] flex justify-between items-center rounded-[5px] '>
                        <div className='flex gap-[30px] items-center'>
                            <img width={28} src={git} alt="" />
                            <div>
                                <div className='flex gap-[20px] items-center '>
                                    <p className='font-bold text-[16px] text-[#DFE2EB] '>kinetic-monolith/core-engine</p>
                                    <p className='font-normal text-[10px] text-[#C8C4D6] flex justify-center items-center py-[2px] rounded-[5px] bg-[#31353C] w-[54px] '>PRIVATE</p>
                                </div>
                                <div className='flex gap-[16px] items-center '>
                                    <div className='flex gap-[5px] items-center '>
                                        <img width={10} src={icon} alt="Icon" />
                                        <p className='font-normal text-[12px] text-[#C8C4D6] '>main</p>
                                    </div>
                                    <div className='flex gap-[5px] items-center '>
                                        <img src={last} alt="icon" />
                                        <p className='font-normal text-[12px] text-[#C8C4D6] '>last</p>
                                    </div>
                                    <p className='font-normal text-[12px] text-[#C8C4D6]'>sync</p>
                                    <p className='font-normal text-[12px] text-[#C8C4D6]'>2m</p>
                                    <p className='font-normal text-[12px] text-[#C8C4D6]'>ago</p>
                                </div>
                            </div>
                        </div>
                        <button className='font-semibold text-[14px] text-[#DFE2EB] py-[8px] px-[16px] bg-[#47455333] rounded-[2px] '>{t("workspace_manage")}</button>
                    </div>
                </div>

                <div id="wrapper" className='flex justify-between items-center '>
                    <div id="card" className='p-8.5 flex flex-col gap-[32px] w-[436px] bg-[#1C2026] rounded-[8px] '>
                        <div className='flex gap-[12px] items-center '><img width={20} src={notification} alt="icon" /> <p className='font-bold text-[18px] text-[#DFE2EB] '>{t("workspace_notifications")}</p></div>
                        <div className='flex flex-col gap-[24px] '>
                            {[1, 2, 3].map((i) => (
                                <div key={i} id="card" className='flex justify-between items-center '>
                                    <div id="text_wrapper">
                                        <p className='font-bold text-[14px] text-[#DFE2EB] '>{t("workspace_task_changes")}</p>
                                        <p className='font-normal text-[12px] text-[#C8C4D6] '>{t("workspace_task_changes_desc")}</p>
                                    </div>
                                    <input type="checkbox" defaultChecked className="toggle" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div id="card" className='p-8.5 flex flex-col gap-[32px] w-[436px] bg-[#1C2026] rounded-[8px] '>
                        <div className='flex gap-[12px] items-center '><img width={20} src={notification} alt="icon" /> <p className='font-bold text-[18px] text-[#DFE2EB] '>{t("workspace_notifications")}</p></div>
                        <div className='flex flex-col gap-[24px] '>
                            {[1, 2, 3].map((i) => (
                                <div key={i} id="card" className='flex justify-between items-center '>
                                    <div id="text_wrapper">
                                        <p className='font-bold text-[14px] text-[#DFE2EB] '>{t("workspace_task_changes")}</p>
                                        <p className='font-normal text-[12px] text-[#C8C4D6] '>{t("workspace_task_changes_desc")}</p>
                                    </div>
                                    <input type="checkbox" defaultChecked className="toggle" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='p-[32px] flex flex-col gap-[32px] bg-[#181C22] mt-[40px]'>
                    <div>
                        <p className='font-bold text-[18px] text-[#FFB4AB] '>{t("workspace_danger")}</p>
                        <p className='font-normal text-[14px] text-[#C8C4D6]  '>{t("workspace_danger_desc")}</p>
                    </div>

                    <div className='flex gap-[16px] items-center'>
                        <button className='font-semibold text-[14px] text-[#DFE2EB] py-[10px] w-[175px] border-[1px] rounded-[5px] border-[#47455333] '>{t("workspace_archive")}</button>
                        <button className='font-semibold text-[14px] text-[#FFB4AB] py-[10px] w-[193px] bg-[#FFB4AB1A] border-[1px] border-[#FFB4AB4D] rounded-[5px] '>{t("workspace_delete_repo")}</button>
                    </div>

                    <div className='w-full flex justify-end gap-[20px] '>
                        <button className='py-[10px] w-[47px] font-semibold text-[14px] text-[#DFE2EB] '>{t("workspace_cancel")}</button>
                        <button className='py-[10px] w-[161px] from-[#C4C0FF] bg-gradient-to-br from-[#C4C0FF] rounded-[5px] to-[#5E56D1] to-[#5E56D1] text-[#240E99]  font-bold text-[14px] text-[#DFE2EB] '>{t("workspace_save")}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WorkSpace
