import { Link } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import logo from "/images/logo.png";


const svgPaths = {
    p14548f00: "M13.3333 6.66667C13.3333 9.99533 9.64067 13.462 8.40067 14.5327C8.28515 14.6195 8.14453 14.6665 8 14.6665C7.85547 14.6665 7.71485 14.6195 7.59933 14.5327C6.35933 13.462 2.66667 9.99533 2.66667 6.66667C2.66667 5.25218 3.22857 3.89562 4.22876 2.89543C5.22896 1.89524 6.58551 1.33333 8 1.33333C9.41449 1.33333 10.771 1.89524 11.7712 2.89543C12.7714 3.89562 13.3333 5.25218 13.3333 6.66667Z",
    p17781bc0: "M8 8.66667C9.10457 8.66667 10 7.77124 10 6.66667C10 5.5621 9.10457 4.66667 8 4.66667C6.89543 4.66667 6 5.5621 6 6.66667C6 7.77124 6.89543 8.66667 8 8.66667Z",
    p1ae0b780: "M10 4.16667L15.8333 10L10 15.8333",
    p1d405500: "M8 3.33333L12.6667 8L8 12.6667",
    p2a798400: "M2.5 17C1.80142 13.7033 1.80142 10.2967 2.5 7C2.59179 6.66521 2.76914 6.36008 3.01461 6.11461C3.26008 5.86914 3.56521 5.69179 3.9 5.6C9.26345 4.71146 14.7366 4.71146 20.1 5.6C20.4348 5.69179 20.7399 5.86914 20.9854 6.11461C21.2309 6.36008 21.4082 6.66521 21.5 7C22.1986 10.2967 22.1986 13.7033 21.5 17C21.4082 17.3348 21.2309 17.6399 20.9854 17.8854C20.7399 18.1309 20.4348 18.3082 20.1 18.4C14.7366 19.2887 9.26343 19.2887 3.9 18.4C3.56521 18.3082 3.26008 18.1309 3.01461 17.8854C2.76914 17.6399 2.59179 17.3348 2.5 17Z",
    p39557800: "M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.9059C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61992 14.1902 8.22773 13.4229 8.09407 12.5922C7.9604 11.7616 8.09207 10.9099 8.47033 10.1584C8.84859 9.40685 9.45419 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87659 12.63 8C13.4789 8.12588 14.2649 8.52146 14.8717 9.12831C15.4785 9.73515 15.8741 10.5211 16 11.37Z",
    p3d19f300: "M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z",
    p3ee34580: "M12.6667 2.66667H3.33333C2.59695 2.66667 2 3.26362 2 4V13.3333C2 14.0697 2.59695 14.6667 3.33333 14.6667H12.6667C13.403 14.6667 14 14.0697 14 13.3333V4C14 3.26362 13.403 2.66667 12.6667 2.66667Z",
    p4fdb300: "M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z",
}


export function StoreFooter() {
    return (
        <footer className="bg-white p-6 md:px-12 md:py-24">
            <div className="max-w-screen-lg mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
                    {/* About Section */}
                    <div className="md:col-span-2">
                        <img src={logo} alt="Seattle Synchro Logo" className="h-[200px] mb-8" />
                        <p className="font-medium text-[#737373] text-[16px] leading-[26px] max-w-sm mb-8">
                            Empowering athletes through the unique blend of swimming, dance, and gymnastics. Join the Northwest's premier artistic swimming community.
                        </p>
                        <div className="flex gap-6">
                            <a href="#" className="text-[#737373] hover:text-[#737373] transition-colors">
                                <svg className="size-6" fill="none" viewBox="0 0 24 24">
                                    <path d={svgPaths.p4fdb300} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                    <path d={svgPaths.p39557800} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                    <path d="M17.5 6.5H17.51" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                </svg>
                            </a>
                            <a href="#" className="text-[#737373] hover:text-[#737373] transition-colors">
                                <svg className="size-6" fill="none" viewBox="0 0 24 24">
                                    <path d={svgPaths.p3d19f300} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                </svg>
                            </a>
                            <a href="#" className="text-[#737373] hover:text-[#737373] transition-colors">
                                <svg className="size-6" fill="none" viewBox="0 0 24 24">
                                    <path d={svgPaths.p2a798400} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                    <path d="M10 15L15 12L10 9V15Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="font-bold text-[#171717] text-[14px] tracking-[1.4px] uppercase mb-8">
                            Navigation
                        </h4>
                        <ul className="flex flex-col gap-4">
                            <li>
                                <Link to="/programs" className="font-medium text-[#737373] text-[14px] hover:text-[#737373] transition-colors">
                                    Programs
                                </Link>
                            </li>
                            <li>
                                <Link to="/programs/summer-camp" className="font-medium text-[#737373] text-[14px] hover:text-[#737373] transition-colors">
                                    Summer Camp
                                </Link>
                            </li>
                            <li>
                                <Link to="/team/coaches" className="font-medium text-[#737373] text-[14px] hover:text-[#737373] transition-colors">
                                    Coaches
                                </Link>
                            </li>
                            {/* <li>
                                <Link to="/" className="font-medium text-[#737373] text-[14px] hover:text-[#737373] transition-colors">
                                    Hall of Fame
                                </Link>
                            </li> */}
                            {/* <li>
                                <Link to="/" className="font-medium text-[#737373] text-[14px] hover:text-[#737373] transition-colors">
                                    About Us
                                </Link>
                            </li> */}
                            <li>
                                <Link to="/contact-us" className="font-medium text-[#737373] text-[14px] hover:text-[#737373] transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-bold text-[#171717] text-[14px] tracking-[1.4px] uppercase mb-8">
                            Contact
                        </h4>
                        <ul className="flex flex-col gap-4">
                            <li className="flex gap-3 items-start">
                                <svg className="size-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 16 16">
                                    <path d={svgPaths.p14548f00} stroke="#021521" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                                    <path d={svgPaths.p17781bc0} stroke="#021521" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                                </svg>
                                <span className="font-medium text-[#737373] text-[14px] leading-[20px]">
                                    123 Aquatic Way,<br />Seattle, WA 98101
                                </span>
                            </li>
                            <li className="flex gap-3 items-center">
                                <svg className="size-4 shrink-0" fill="none" viewBox="0 0 16 16">
                                    <path d="M5.33333 1.33333V4" stroke="#021521" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                                    <path d="M10.6667 1.33333V4" stroke="#021521" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                                    <path d={svgPaths.p3ee34580} stroke="#021521" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                                    <path d="M2 6.66667H14" stroke="#021521" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                                </svg>
                                <span className="font-medium text-[#737373] text-[14px] leading-[20px]">
                                    Mon - Sat: 6:00 AM - 8:00 PM
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-[#f5f5f5] flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="font-medium text-[#737373] text-[12px] tracking-[1.2px] uppercase">
                        © Seattle Synchro 2026. All Rights Reserved.
                    </p>
                    <div className="flex gap-8 items-center">
                        <Link to="/" className="font-bold text-[#737373] text-[10px] tracking-[1px] uppercase hover:text-[#737373] transition-colors">
                            Privacy Policy
                        </Link>
                        <Link to="/" className="font-bold text-[#737373] text-[10px] tracking-[1px] uppercase hover:text-[#737373] transition-colors">
                            Terms of Service
                        </Link>
                        <Link to="/" className="font-bold text-[#737373] text-[10px] tracking-[1px] uppercase hover:text-[#737373] transition-colors">
                            Accessibility
                        </Link>
                        <Link to="/login" className="text-[#a1a1a1] hover:text-[#737373] transition-colors">
                            <Lock size={10} />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
