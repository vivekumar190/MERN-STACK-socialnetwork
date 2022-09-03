/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Dropdown, Text, Grid, User ,Button,Switch,changeTheme,useTheme,Image} from "@nextui-org/react";
import { Link } from "react-router-dom";
import {

  MenuIcon,
  XIcon,
  BookOpenIcon,
} from "@heroicons/react/outline";
import { PlusIcon, LogoutIcon } from "@heroicons/react/solid";
import { useDispatch,useSelector } from "react-redux";
import { logoutAction } from "../../../redux/slices/users/usersSlices";



const navigation = [
  { name: "Home", href: "/", current: false,icon:'/icons/4394041.png' },
  { name: "Create", href: "/create-post", current: false ,icon:'/icons/tab.png'},
  { name: "Posts", href: "/posts", current: false ,icon:'/icons/trend.png'},
  { name: "Users", href: "/users", current: false ,icon:'/icons/users.png'},
  { name: "Societies", href: "/societies", current: false ,icon:'/icons/sword.png'},
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const PrivateNavbar = ({ isLogin }) => {

//logout
const dispatch=useDispatch();
const state =useSelector(state=>state.users);
const  {profilePhoto,firstName,lastName,email,isAdmin,_id} = state.userAuth;
const name=firstName +' '+ lastName;
const { isDark } = useTheme();

const handleChange = () => {
  const nextTheme = isDark ? 'light' : 'dark';
  window.localStorage.setItem('light-theme', nextTheme); // you can use any storage
  changeTheme(nextTheme);}

  return (
    <Disclosure as="nav" className="bg-black static left-0 right-0 z-10 p-2">
      {({ open }) => (
        <>
          <div className="max-w-xxl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-shrink-0 flex items-center">
                  {/* Logo */}
                  <img src="/superstar@2x.png" width={50} height={50}></img>
                </div>
                <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                  {navigation.map(item => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "px-3 py-2 rounded-md text-sm font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                      <Image height={25} width={25}src={item.icon}></Image>
                    </Link>
                  ))}
                </div>
              </div>
  
   
              <div className="flex items-center">
                <div className="flex-shrink-0 ">
     
                  <Link
                    to="/create-post"
                    className="pr-3  relative inline-flex items-center mr-2 px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                  >
                    <PlusIcon
                      className="-ml-1 mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    <span>New Post</span>
                  </Link>

                  <button onClick={()=>dispatch(logoutAction())}
                    type="button"
                    className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                  >
                    <LogoutIcon 
                      className="-ml-1 mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    <span>Logout</span>
                  </button>
                </div>
                <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative z-10">
                    {({ open }) => (
                      <>
                        <div>
                          <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={profilePhoto}
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          show={open}
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            static
                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
          <Grid.Container justify="flex-start" gap={3}>
      <Grid>
        <Dropdown placement="bottom-left">
          <Dropdown.Trigger>
            <User
              bordered
              as="button"
              size="lg"
              color="gradient"
              name={name}
              description={isAdmin? <Text css={{
                textGradient: "45deg, $yellow600 -20%, $red600 100%",
              }}>ADMIN</Text>:null}
              src={profilePhoto}
            />
          </Dropdown.Trigger>
          <Dropdown.Menu color="primary" aria-label="User Actions">
            <Dropdown.Item key="profile" css={{ height: "$18" }}>
              <Text b color="inherit" css={{ d: "flex" }}>
                Signed in as
              </Text>
              <Text b color="inherit" css={{ d: "flex" }}>
              {email}
              </Text>
            </Dropdown.Item>
            <Dropdown.Item key="settings" withDivider>
            <Link
                    to={`/profile/${_id}`}

                  >
                  
                    <span>Profile</span>
                  </Link>
            </Dropdown.Item>
            <Dropdown.Item key="team_settings">Team Settings</Dropdown.Item>
            <Dropdown.Item key="analytics" withDivider>
            <Link
                    to="/change-password"
                  >
                   
                    <span>Change password</span>
                  </Link>
            </Dropdown.Item>
            <Dropdown.Item key="system">Request a Space</Dropdown.Item>
            <Dropdown.Item key="configurations">Privacy Policy</Dropdown.Item>
            <Dropdown.Item key="logout" color='error' withDivider>
            <Button
                    type="button" onClick={()=>dispatch(logoutAction())}
                    className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                  >
                    <LogoutIcon
                      className="-ml-1 mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    <span>Logout</span>
                  </Button>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Grid>
    </Grid.Container>
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Grid.Container>
              {navigation.map(item => (
               
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                ><Grid><Image height={50} width={50}src={item.icon}></Image></Grid>
                   
                </a>
                
              ))}
              </Grid.Container>
            </div>
            {/* Mobile */}
            <Grid.Container  gap={1}>
      <Grid>
        <Dropdown placement="bottom-left">
          <Dropdown.Trigger>
            <User
              bordered
              as="button"
              size="lg"
              color="gradient"
              name= {firstName +' '+lastName }
              description={isAdmin? <Text css={{
                textGradient: "45deg, $yellow600 -20%, $red600 100%",
              }}>ADMIN</Text>:null}
              src={profilePhoto}
            />
       
          </Dropdown.Trigger>
          
          <Dropdown.Menu color="primary" aria-label="User Actions">
            <Dropdown.Item key="profile" css={{ height: "$18" }}>
              <Text b color="inherit" css={{ d: "flex" }}>
                Signed in as
              </Text>
              <Text b color="inherit" css={{ d: "flex" }}>
              {email}
              </Text>
            </Dropdown.Item>
            <Dropdown.Item key="settings" withDivider>
            <Link
                    to={`/profile/${_id}`}

                  >
                  
                    <span>Profile</span>
                  </Link>
            </Dropdown.Item>
            
            <Dropdown.Item key="settings" withDivider>
            <Link
                    to={`/profile/${_id}`}

                  >
                  
                    <span>Profile</span>
                  </Link>
            </Dropdown.Item>
            <Dropdown.Item key="team_settings">Team Settings</Dropdown.Item>
            <Dropdown.Item key="analytics" withDivider>
            <Link
                    to="/change-password"
                  >
                   
                    <span>Change password</span>
                  </Link>
            </Dropdown.Item>
            <Dropdown.Item key="system">Request a Space</Dropdown.Item>
            <Dropdown.Item key="configurations">Privacy Policy</Dropdown.Item>
            <Dropdown.Item key="logout" color='error' withDivider>
            <Button
                    type="button" onClick={()=>dispatch(logoutAction())}
                    className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                  >
                    <LogoutIcon
                      className="-ml-1 mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    <span>Logout</span>
                  </Button>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
     
      </Grid>
    </Grid.Container>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default PrivateNavbar;
