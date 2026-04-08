import React from 'react'

const Navbar = () => {
  return (
    <div>
             <div className="flex items-center justify-between px-40 py-5">
          <h1 className="text-lg font-semibold">GitLuma</h1>

          <div className="flex items-center gap-8 text-gray-400 text-sm">
            <p className="hover:text-white cursor-pointer">{t("platform")}</p>
            <p className="hover:text-white cursor-pointer">{t("documentation")}</p>
            <p className="hover:text-white cursor-pointer">{t("changelog")}</p>

          
            <div className="flex gap-2 bg-white/10 backdrop-blur px-2 py-1 rounded-lg text-xs">
              <button onClick={() => changeLang("en")}>EN</button>
              <button onClick={() => changeLang("uz")}>UZ</button>
              <button onClick={() => changeLang("ru")}>RU</button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Navbar