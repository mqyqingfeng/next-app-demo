"use client";

import { useState, useRef, Fragment, useEffect } from "react";
import {
  usePathname,
  useParams,
  useRouter,
  useSelectedLayoutSegments,
} from "next/navigation";
import siteMetadata from "@/data/siteMetadata";
import { Menu, Transition, RadioGroup } from "@headlessui/react";

const { languages } = siteMetadata;

const LangSwitch = () => {
  const urlSegments = useSelectedLayoutSegments();
  const router = useRouter();
  const params = useParams();
  const [locale, setLocal] = useState(params?.lng);


  const handleLocaleChange = (newLocale) => {
    const newUrl = `/${newLocale}/${urlSegments.join("/")}`;
    return newUrl;
  };

  const handleLinkClick = (newLocale) => {
    const resolvedUrl = handleLocaleChange(newLocale);
    router.push(resolvedUrl);
  };

  return (
    <div className="relative inline-block text-left mr-5">
      <Menu>
        <div>
          <Menu.Button>
            {locale.charAt(0).toUpperCase() + locale.slice(1)}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition-all ease-out duration-300"
          enterFrom="opacity-0 scale-95 translate-y-[-10px]"
          enterTo="opacity-100 scale-100 translate-y-0"
          leave="transition-all ease-in duration-200"
          leaveFrom="opacity-100 scale-100 translate-y-0"
          leaveTo="opacity-0 scale-95 translate-y-[10px]"
        >
          <Menu.Items className="absolute right-0 z-50 mt-2 w-12 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800">
            <RadioGroup value={locale} onChange={handleLinkClick}>
              <div className="py-1">
                {languages.map((newLocale) => (
                  <RadioGroup.Option key={newLocale} value={newLocale}>
                    <Menu.Item>
                      <button className="group flex w-full items-center rounded-md px-2 py-2 text-sm">
                        {newLocale.charAt(0).toUpperCase() + newLocale.slice(1)}
                      </button>
                    </Menu.Item>
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default LangSwitch;
