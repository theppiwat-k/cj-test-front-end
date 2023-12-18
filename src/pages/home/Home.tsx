import React from "react";
import {Outlet} from "react-router-dom";
import SideBarComponent from "../../components/layouts/SideBar";
import {TopBarComponent} from "../../components/layouts/TopBar.";

export function Home() {
  return (
    <>
      <div>
        <section className="flex">
          <section role="navigation">
            <SideBarComponent />
          </section>
        </section>
        <section role="main" className="z-0 w-full">
          <main className="main min-h-screen w-full bg-gray-50 transition-all md:ml-64 md:w-[calc(100%-256px)]">
            <TopBarComponent />
            <div className="px-6 py-8">
              <Outlet />
            </div>
          </main>
        </section>
      </div>
    </>
  );
}

export default Home;
