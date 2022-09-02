import './App.css';
import { NavBar } from './components/nav-bar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/home/home.page';
import { LoginPage } from './pages/login/login.page';
import { RegisterPage } from './pages/register/register.page';
import { ProfilePage } from './pages/profile/profile.page';
import { AdminPage } from './pages/admin/admin.page';
import { AdminUsersPage } from './pages/admin/admin.users.page';
import { NotFoundPage } from './pages/not-found/not-found.page';
import { UnauthorizedPage } from './pages/unauthorized/unauthorized.page';
import { AuthGuard } from './guards/auth.guard';
import { Role } from './models/role';
import { UpdateUserPassword } from './pages/updatePassword/update.user.password';
import { ParkingCalculator } from './pages/parkingCalculator/parking.calculator';
import { AdminParkingsPage } from './pages/admin/admin.parking.page';
import { NewReservation } from './components/new.reservation';
import { Jumbotron, Button, Container } from "react-bootstrap";

function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <Container fluid>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/home" element={<HomePage />} />


                    <Route path="/parking-calculator" element={<Container ><ParkingCalculator /></Container>} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    <Route path="/profile" element={
                        <AuthGuard roles={[Role.ADMIN, Role.USER]}>
                            <Container ><ProfilePage /></Container>
                        </AuthGuard>
                    }
                    />

                    <Route path="/admin-reservations" element={
                        <AuthGuard roles={[Role.ADMIN]}>
                            <Container > <AdminPage /></Container>
                        </AuthGuard>
                    } />

                    <Route path="/admin-users" element={
                        <AuthGuard roles={[Role.ADMIN]}>
                            <Container ><AdminUsersPage /></Container>
                        </AuthGuard>
                    } />

                    <Route path="/admin-parkings" element={
                        <AuthGuard roles={[Role.ADMIN]}>
                            <Container ><AdminParkingsPage /></Container>
                        </AuthGuard>
                    } />

                    <Route path="/change-password" element={
                        <AuthGuard roles={[Role.ADMIN, Role.USER]}>
                            <Container ><UpdateUserPassword /></Container>
                        </AuthGuard>
                    } />

                    <Route path="/new-reservation" element={
                        <AuthGuard roles={[Role.ADMIN, Role.USER]}>
                            <Container ><NewReservation /></Container>
                        </AuthGuard>
                    } />



                    <Route path="/404" element={<Container ><NotFoundPage /></Container>} />
                    <Route path="/401" element={<Container ><UnauthorizedPage /></Container>} />
                    <Route path="*" element={<Container ><NotFoundPage /></Container>} />
                </Routes>
            </Container>
        </BrowserRouter>
    );
}

export default App;
