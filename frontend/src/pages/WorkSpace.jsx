import { useState } from 'react'
import { useSelector } from 'react-redux'
import git from "../assets/SVG.png"
import icon from "../assets/Icon.png"
import last from "../assets/Container.png"
import notification from "../assets/Container (1).png"

const WorkSpace = () => {
    const isDark = useSelector((s) => s.theme.mode) === "dark";
    const [notifSettings, setNotifSettings] = useState({
        "Task Status Changes": true,
        "New Commits": true,
        "PR Reviews": true,
    });

    const theme = isDark
        ? {
            pageBg: "#10141A",
            cardBg: "#181C22",
            innerBg: "#262A31",
            secondCardBg: "#1C2026",
            heading: "#DFE2EB",
            text: "#C8C4D6",
            badge: "#474553",
            pillBg: "#31353C",
            btnBg: "#47455333",
            dangerTitle: "#FFB4AB",
            dangerBtnBg: "#FFB4AB1A",
            dangerBtnBorder: "#FFB4AB4D",
            dangerBtnText: "#FFB4AB",
            cancelText: "#DFE2EB",
            connectedBg: "#0067D733",
            connectedText: "#ADC6FF",
        }
        : {
            pageBg: "#F4F6FB",
            cardBg: "#FFFFFF",
            innerBg: "#F8F9FC",
            secondCardBg: "#FFFFFF",
            heading: "#181D2A",
            text: "#5C6480",
            badge: "#9499B2",
            pillBg: "#EEF1F7",
            btnBg: "rgba(43,49,65,0.08)",
            dangerTitle: "#E03D3D",
            dangerBtnBg: "rgba(224,61,61,0.08)",
            dangerBtnBorder: "rgba(224,61,61,0.3)",
            dangerBtnText: "#E03D3D",
            cancelText: "#5C6480",
            connectedBg: "rgba(0,103,215,0.1)",
            connectedText: "#3A7EE8",
        };

    return (
        <div style={{ backgroundColor: theme.pageBg }}>
            <div id="container" className='max-w-full w-[90%] mx-auto py-[70px]'>
                <h1 className='font-[900] text-[30px]' style={{ color: theme.heading }}>Workspace Settings</h1>
                <p className='font-[400] text-[16px] mt-2.5' style={{ color: theme.text }}>Manage your development environment and integration preferences.</p>

                <div id="card-1" className='p-[32px] rounded-2xl flex flex-col gap-[30px] mt-6' style={{ backgroundColor: theme.cardBg }}>
                    <div className='flex justify-between items-start'>
                        <div>
                            <p className='font-[700] text-[18px]' style={{ color: theme.heading }}>GitHub Connection</p>
                            <p className='font-normal text-[14px]' style={{ color: theme.text }}>Link your repositories to sync issues and pull requests.</p>
                        </div>
                        <ul className='py-[6px] pr-[12px] pl-[30px] w-[115px] rounded-2xl flex justify-center items-center' style={{ backgroundColor: theme.connectedBg }}>
                            <li className='list-disc' style={{ color: theme.connectedText }}>Connected</li>
                        </ul>
                    </div>

                    <div className='py-[22px] px-[25px] flex justify-between items-center rounded-[5px]' style={{ backgroundColor: theme.innerBg }}>
                        <div className='flex gap-[30px] items-center'>
                            <img width={28} src={git} alt="" />
                            <div>
                                <div className='flex gap-[20px] items-center'>
                                    <p className='font-bold text-[16px]' style={{ color: theme.heading }}>kinetic-monolith/core-engine</p>
                                    <p className='font-normal text-[10px] flex justify-center items-center py-[2px] rounded-[5px] w-[54px]' style={{ color: theme.text, backgroundColor: theme.pillBg }}>PRIVATE</p>
                                </div>
                                <div className='flex gap-[16px] items-center'>
                                    <div className='flex gap-[5px] items-center'>
                                        <img width={10} src={icon} alt="Icon" />
                                        <p className='font-normal text-[12px]' style={{ color: theme.text }}>main</p>
                                    </div>
                                    <div className='flex gap-[5px] items-center'>
                                        <img src={last} alt="icon" />
                                        <p className='font-normal text-[12px]' style={{ color: theme.text }}>last</p>
                                    </div>
                                    <p className='font-normal text-[12px]' style={{ color: theme.text }}>sync</p>
                                    <p className='font-normal text-[12px]' style={{ color: theme.text }}>2m</p>
                                    <p className='font-normal text-[12px]' style={{ color: theme.text }}>ago</p>
                                </div>
                            </div>
                        </div>
                        <button className='font-semibold text-[14px] py-[8px] px-[16px] rounded-[2px]' style={{ color: theme.heading, backgroundColor: theme.btnBg }}>Manage</button>
                    </div>
                </div>

                <div id="wrapper" className='mt-6'>
                    <div className='p-8 flex flex-col gap-[32px] rounded-[8px]' style={{ backgroundColor: theme.secondCardBg }}>
                        <div className='flex gap-[12px] items-center'>
                            <img width={20} src={notification} alt="Notifications" />
                            <p className='font-bold text-[18px]' style={{ color: theme.heading }}>Notifications</p>
                        </div>
                        <div className='flex flex-col gap-[24px]'>
                            {["Task Status Changes", "New Commits", "PR Reviews"].map((label) => (
                                <div key={label} className='flex justify-between items-center'>
                                    <div>
                                        <p className='font-bold text-[14px]' style={{ color: theme.heading }}>{label}</p>
                                        <p className='font-normal text-[12px]' style={{ color: theme.text }}>Notify when a task moves between lanes.</p>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={notifSettings[label]}
                                        onChange={(e) => setNotifSettings(prev => ({ ...prev, [label]: e.target.checked }))}
                                        className="toggle"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='p-[32px] flex flex-col gap-[32px] mt-[40px] rounded-lg' style={{ backgroundColor: theme.cardBg }}>
                    <div>
                        <p className='font-bold text-[18px]' style={{ color: theme.dangerTitle }}>Danger Zone</p>
                        <p className='font-normal text-[14px]' style={{ color: theme.text }}>Irreversible actions that affect the entire monolith workspace.</p>
                    </div>

                    <div className='flex gap-[16px] items-center'>
                        <button className='font-semibold text-[14px] py-[10px] w-[175px] border-[1px] rounded-[5px]' style={{ color: theme.heading, borderColor: theme.btnBg }}>Archive Workspace</button>
                        <button className='font-semibold text-[14px] py-[10px] w-[193px] border-[1px] rounded-[5px]' style={{ color: theme.dangerBtnText, backgroundColor: theme.dangerBtnBg, borderColor: theme.dangerBtnBorder }}>Delete Repository Link</button>
                    </div>

                    <div className='w-full flex justify-end gap-[20px]'>
                        <button className='py-[10px] w-[47px] font-semibold text-[14px]' style={{ color: theme.cancelText }}>Cancel</button>
                        <button className='py-[10px] w-[161px] rounded-[5px] bg-gradient-to-br from-[#C4C0FF] to-[#5E56D1] font-bold text-[14px] text-white'>Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WorkSpace
