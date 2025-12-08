import logoTruong from "../../assets/img/jpg/logo.jpg"
import { IoLogoFacebook } from "react-icons/io";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import ModelAI from "../client/modelAI";

const AppFooter = () => {
    return (
        <footer className='bg-[#181818] text-white'>
            <ModelAI />
            <div className='p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-xs'>
                {/* Company Info */}
                <div className="flex gap-5 lg:col-span-2 items-start">
                    <img 
                        src={logoTruong} 
                        width={80} 
                        height={80}
                        className="rounded-full flex-shrink-0" 
                        alt="Truong Logo" 
                    />
                    <div className='flex flex-col gap-1'>
                        <p><strong>Trường:</strong> Trung học phổ thông Lý Tự Trọng</p>
                        <p><strong>Địa chỉ:</strong> Thôn Gia An, Phường Hoài Nhơn Bắc, Tỉnh Gia Lai</p>
                    </div>
                </div>

                {/* Contact */}
                <div>
                    <h3 className='font-semibold mb-2'>Contact</h3>
                    <ul className='flex flex-col gap-1'>
                        <li>Phone: <a href="tel:+84942344874" className='hover:underline'>+84 942 344 874</a></li>
                        <li>Email: <a href="mailto:truong@gmail.com" className='hover:underline'>thptltt@gmail.com</a></li>
                    </ul>
                </div>

                {/* Customer Service */}
                <div>
                    <h3 className='font-semibold mb-2'>Customer Service</h3>
                    <ul className='flex flex-col gap-1'>
                        <li>Q&A</li>
                        <li>Open: 7AM - 8PM</li>
                        <li>Contact for cooperation</li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h3 className='font-semibold mb-2'>Social Media</h3>
                    <div className='flex gap-3'>
                        <a href="https://facebook.com" aria-label="Visit our Facebook page" className='hover:text-blue-400 transition-colors'>
                            <IoLogoFacebook className='text-2xl' />
                        </a>
                        <a href="https://twitter.com" aria-label="Visit our Twitter page" className='hover:text-blue-300 transition-colors'>
                            <FaSquareXTwitter className='text-2xl' />
                        </a>
                        <a href="https://instagram.com" aria-label="Visit our Instagram page" className='hover:text-pink-400 transition-colors'>
                            <FaInstagram className='text-2xl' />
                        </a>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className='text-center py-4 border-t border-gray-700'>
                <p className='text-xs text-gray-400'>
                    Copyright © {new Date().getFullYear()} - All rights reserved by Nguyễn Duy Thư
                </p>
            </div>
        </footer>
    )
}

export default AppFooter