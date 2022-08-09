import { useDispatch, useSelector } from 'react-redux';
import './profile.page.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPercentage } from '@fortawesome/free-solid-svg-icons';
import { faParking } from '@fortawesome/free-solid-svg-icons';
import { faHourglassHalf } from '@fortawesome/free-solid-svg-icons';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { ProfileUserData } from './profile.user.data';

const ProfilePage = () => {
    const currentUser = useSelector(state => state.user);

    return (
        <><ProfileUserData /><div class="content">
            <div class="container-fluid">
                <div class="row" style={{ marginTop: 25 }}>
                    <div class="col-lg-6 col-sm-6">
                        <div class="card">
                            <div class="content">
                                <div class="row">
                                    <div class="col-xs-7">
                                        <div class="numbers">
                                            <FontAwesomeIcon icon={faPercentage} className="icon-big discount left text-center" />
                                            <p>Ukupno</p>
                                            27
                                        </div>
                                    </div>
                                </div>
                                <div class="footer">
                                    <hr />
                                    <div class="stats">
                                    <FontAwesomeIcon icon={faArrowRight} /> Trenutni popust
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-sm-6">
                        <div class="card">
                            <div class="content">
                                <div class="row">
                                    <div class="col-xs-7">
                                        <div class="numbers">
                                            <FontAwesomeIcon icon={faParking} className="icon-big discount left text-center" />

                                            <p>Ostalo</p>
                                            20
                                        </div>
                                    </div>
                                </div>
                                <div class="footer">
                                    <hr />
                                    <div class="stats">
                                    <FontAwesomeIcon icon={faArrowRight} /> Broj slobodnih parkirnih mjesta
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-sm-6">
                        <div class="card">
                            <div class="content">
                                <div class="row">
                                    <div class="col-xs-7">
                                        <div class="numbers">
                                            <FontAwesomeIcon icon={faHourglassHalf} className="icon-big discount left text-center" />
                                            <p>Ukupno</p>
                                            0
                                        </div>
                                    </div>
                                </div>
                                <div class="footer">
                                    <hr />
                                    <div class="stats">
                                    <FontAwesomeIcon icon={faArrowRight} /> Broj preostalih dana tekuće rezervacije
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-sm-6">
                        <div class="card">
                            <div class="content">
                                <div class="row">
                                    <div class="col-xs-7">
                                        <div class="numbers">
                                            <FontAwesomeIcon icon={faQuestion} className="icon-big discount left text-center" />
                                            <p>Testni</p>
                                            0
                                        </div>
                                    </div>
                                </div>
                                <div class="footer">
                                    <hr />
                                    <div class="stats">
                                    <FontAwesomeIcon icon={faArrowRight} /> Testni
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-9 col-sm-9">
                        <p>* stari godišnji morate iskoristiti do kraja trećeg mjeseca 2022 godine.</p>
                    </div>
                </div>
            </div>
        </div></>

    )
}

export { ProfilePage };
