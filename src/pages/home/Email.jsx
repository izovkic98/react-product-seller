import React, { useRef } from 'react';
import emailjs from 'emailjs-com';
import { I18nProvider, LOCALES } from "../../i18n";
import { FormattedMessage, IntlProvider } from "react-intl";

export const Email = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('gmail', 'template_rrmpljf', form.current, '-_9372REtDDvclKzG')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        e.target.reset();
    };

    return (
        <I18nProvider locale={localStorage.getItem("language")}>
            <div>
                <div className="container">
                    <form ref={form} onSubmit={sendEmail}>
                        <div className="row pt-5 mx-auto">
                            <div className="col-8 form-group mx-auto">
                                <label htmlFor="name"><FormattedMessage id='fName_lName' /></label>
                                <input type="text" className="form-control" placeholder="Name" name="name" />
                            </div>
                            <div className="col-8 form-group pt-2 mx-auto">
                                <label htmlFor="email"><FormattedMessage id='email' /></label>

                                <input type="email" className="form-control" placeholder="Email Address" name="email" />
                            </div>
                            <div className="col-8 form-group pt-2 mx-auto">
                                <label htmlFor="subject"><FormattedMessage id='subject' />:</label>

                                <input type="text" className="form-control" placeholder="Subject" name="subject" />
                            </div>
                            <div className="col-8 form-group pt-2 mx-auto">
                                <label htmlFor="message"><FormattedMessage id='message' />:</label>
                                <textarea className="form-control" id="" cols="30" rows="8" placeholder="Your message" name="message"></textarea>
                            </div>

                            <FormattedMessage id='send_message'>
                                {(msg) => (
                                    <div className="col-8 pt-3 mx-auto">
                                        <input type="submit" className="btn btn-primary" value={msg}></input>
                                    </div>
                                )}
                            </FormattedMessage>
                        </div>
                    </form>
                </div>
            </div>
        </I18nProvider>
    );
};