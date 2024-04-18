import React from 'react';
import { FaGithub, FaInstagram, FaFacebook } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-dark text-light text-center py-3">
            <div className="container">
                <p className="mb-0">© 2024 FLATEVENT</p>
                <p className="mb-0">All rights reserved.</p>
                <div className="mt-3">
                    {/* Social media links/icons */}
                    <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-light me-3">
                        <FaGithub size={24} />
                    </a>
                    <a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-light me-3">
                        <FaInstagram size={24} />
                    </a>
                    <a href="https://facebook.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-light me-3">
                        <FaFacebook size={24} />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
