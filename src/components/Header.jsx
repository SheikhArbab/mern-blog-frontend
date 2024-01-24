import React from 'react';
import { Navbar, TextInput, Button, Dropdown, Avatar } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { currentUser } from '../redux/features/authSlice'
import { toggleTheme } from '../redux/features/themeSlice'


const Header = () => {

    const path = useLocation().pathname
    const dispatch = useDispatch()

    const { user } = useSelector(state => state.auth)
    const { theme } = useSelector(state => state.theme)

    const handleLogOut = () => {
        dispatch(currentUser({ user: '', token: '' }))
    }

    return (
        <Navbar className='border-b-2'>
            <Link to={'/'} className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
                <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Arbab's</span>
                <span className='dark:text-slate-400 font-bold ml-2'>Blog</span>
            </Link>

            <form>
                <TextInput
                    type='text'
                    placeholder='Search'
                    rightIcon={AiOutlineSearch}
                    className='hidden lg:inline'
                />
            </form>

            <Button className='w-12 h-12 lg:hidden' color='gray' pill>
                <AiOutlineSearch />
            </Button>

            <div className='flex gap-2 md:order-2'>
                <Button className='w-12 h-10 hidden sm:inline' color='gray' pill onClick={() => dispatch(toggleTheme())}>
                    {theme === 'light' ? <FaSun /> : <FaMoon />}
                </Button>

                {
                    user ? (
                        <Dropdown arrowIcon={false} inline label={
                            <Avatar
                                alt='user'
                                img={user.profilePicture}
                                rounded
                            />
                        }>

                            <Dropdown.Header>
                                <span className='block text-sm'>@{user.username}</span>
                                <span className='block text-sm font-medium truncate'>@{user.email}</span>
                            </Dropdown.Header>

                            <Link to={'/dashboard?tab=profile'}>
                                <Dropdown.Item>Profile</Dropdown.Item>
                            </Link>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={handleLogOut}>Sign Out</Dropdown.Item>
                        </Dropdown>
                    ) : (<Link to='/sign-in'>
                        <Button gradientDuoTone='purpleToBlue' outline>
                            Sign In
                        </Button>
                    </Link>)
                }



                <Navbar.Toggle />

            </div>

            <Navbar.Collapse>
                <Navbar.Link active={path === '/'} as={'div'}>
                    <Link className='block' to='/'>Home</Link>
                </Navbar.Link>
                <Navbar.Link active={path === '/about'} as={'div'}>
                    <Link className='block' to='/about'>About</Link>
                </Navbar.Link>
                <Navbar.Link active={path === '/projects'} as={'div'}>
                    <Link className='block' to='/projects'>Projects</Link>
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;
