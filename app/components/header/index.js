import Link from "next/link";
import ButtonLink from "../ButtonLink";
import Image from "next/image";
const Header = () => {
    return (
       <>
      <header style={{ backgroundColor: "#d4eeff" }}>
  <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
    <div className="flex lg:flex-1">
    
        <Image
      src="/images/l.jpg"
      alt="Printers with blue schematic background"
      width={99}
      height={24}
    />
      
    </div>
    <div className="flex lg:hidden">
      <button type="button" command="show-modal" commandfor="mobile-menu" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
        <span className="sr-only">Open main menu</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6">
          <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
    <el-popover-group className="hidden lg:flex lg:gap-x-12">
      <Link href="#" className="text-2xl/6 font-semibold text-gray-900 uppercase">Officejet</Link>
      <Link href="#" className="text-2xl/6 font-semibold text-gray-900 uppercase">Laserjet</Link>
      <Link href="#" className="text-2xl/6 font-semibold text-gray-900 uppercase">Pixma</Link>
      <Link href="#" className="text-2xl/6 font-semibold text-gray-900 uppercase">Maxify</Link>
      <Link href="#" className="text-2xl/6 font-semibold text-gray-900 uppercase">XP Series</Link>
    </el-popover-group>
    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
      <Link href="/contact-us" className="text-2xl/6 font-semibold text-gray-900 uppercase">  
        Contact Us
    </Link>
    </div>
  </nav>
  <el-dialog>
    <dialog id="mobile-menu" className="backdrop:bg-transparent lg:hidden">
      <div tabIndex="0" className="fixed inset-0 focus:outline-none">
        <el-dialog-panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              {/* <Image src="" alt="" className="h-8 w-auto" /> */}
            </Link>
            <button type="button" command="close" commandfor="mobile-menu" className="-m-2.5 rounded-md p-2.5 text-gray-700">
              <span className="sr-only">Close menu</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6">
                <path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <div className="-mx-3">
                  <button type="button" command="--toggle" commandfor="products" className="flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                    Product
                    <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="size-5 flex-none in-aria-expanded:rotate-180">
                      <path d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" fillRule="evenodd" />
                    </svg>
                  </button>
                  <el-disclosure id="products" hidden className="mt-2 block space-y-2">
                    <Link href="#" className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50">Analytics</Link>
                    <Link href="#" className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50">Engagement</Link>
                    <Link href="#" className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50">Security</Link>
                    <Link href="#" className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50">Integrations</Link>
                    <Link href="#" className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50">Automations</Link>
                    <Link href="#" className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50">Watch demo</Link>
                    <Link href="#" className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50">Contact sales</Link>
                  </el-disclosure>
                </div>
                <Link href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Features</Link>
                <Link href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Marketplace</Link>
                <Link href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Company</Link>
              </div>
              <div className="py-6">
                <Link href="#" className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Log in</Link>
              </div>
            </div>
          </div>
        </el-dialog-panel>
      </div>
    </dialog>
  </el-dialog>
</header>
       </>
    );
}

export default Header;
