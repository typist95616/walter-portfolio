import { useState } from "react";
import "./Contact.scss";
import emailjs from 'emailjs-com';

export default function Contact() {

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();
        emailjs.sendForm('service_m247ebs', 'template_9x035za', e.currentTarget as HTMLFormElement, 'VMFToWX3DpYH4YCie')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    }

    return (
        <div className="contact-container" id={"contact"}>
            <div className="contact-root">
                <div className="contact-content">
                    <div className="contact-heading">Get in touch~</div>
                    <form className="contact-form" onSubmit={sendEmail}>
                        <div className="form-name">
                            <div className="form-name-text">Full Name: </div>
                            <input type="text" placeholder="Your Name" className="form-name-input" name="name"></input>
                        </div>
                        <div className="form-email">
                            <div className="form-email-text">Email: </div>
                            <input type="email" placeholder="Your Email" className="form-email-input" name="email"></input>
                        </div>
                        <div className="form-message">
                            <div className="form-message-text">Message: </div>
                            <textarea placeholder="Your Message..." className="form-message-input" name="message"></textarea>
                        </div>
                        <button className="form-submitButton" type="submit">
                            <div className="form-submitButton-text">Submit</div>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}