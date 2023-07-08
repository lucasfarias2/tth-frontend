import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import RegisterIcon from '@/shared/components/ui/icons/RegisterIcon';
import EQueryKeys from '@/shared/queries/query-keys';
import { ExternalLinkIcon } from '../ui/icons';
import BarChartIcon from '../ui/icons/BarChartIcon';
import ConfigurationIcon from '../ui/icons/ConfigurationIcon';
import FileIcon from '../ui/icons/FileIcon';
import FrequencyIcon from '../ui/icons/FrequencyIcon';
import HelpIcon from '../ui/icons/HelpIcon';
import HomeIcon from '../ui/icons/HomeIcon';
import LoginIcon from '../ui/icons/LoginIcon';
import NavbarLinkMobile from './NavbarLink.mobile';
import NavbarLinkExternalMobile from './NavbarLinkExternal.mobile';
import NavbarWrapperMobile from './NavbarWrapper.mobile';

const NavbarGuestMobile = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData([EQueryKeys.User]) as TTHUser;
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  const accountLinks = user ? (
    <>
      <NavbarLinkExternalMobile to="/account/" Icon={HomeIcon} label="Dashboard" />
      <NavbarLinkExternalMobile to="/account/habits" Icon={FrequencyIcon} label="My habits" />
      <NavbarLinkExternalMobile to="/account/stats" Icon={BarChartIcon} label="My statistics" />
      <NavbarLinkExternalMobile to="/account/settings" Icon={ConfigurationIcon} label="My settings" />
    </>
  ) : (
    <>
      <NavbarLinkMobile
        to="/login"
        Icon={LoginIcon}
        label="Login"
        closeMenu={() => {
          setOpenMobileMenu(false);
        }}
      />
      <NavbarLinkMobile
        to="/signup"
        Icon={RegisterIcon}
        label="Sign up"
        closeMenu={() => {
          setOpenMobileMenu(false);
        }}
      />
    </>
  );

  const guestLinks = (
    <>
      <NavbarLinkMobile
        to="/roadmap"
        Icon={FileIcon}
        label="Development roadmap"
        subLabel="What's next?"
        closeMenu={() => {
          setOpenMobileMenu(false);
        }}
      />
      <NavbarLinkMobile
        to="/contact"
        Icon={HelpIcon}
        label="Contact us"
        subLabel="Need help?"
        closeMenu={() => {
          setOpenMobileMenu(false);
        }}
      />
      {user.is_staff && <NavbarLinkExternalMobile to="/backoffice" Icon={ExternalLinkIcon} label="Backoffice" />}
    </>
  );

  return (
    <NavbarWrapperMobile
      guestLinks={guestLinks}
      accountLinks={accountLinks}
      setOpenMobileMenu={setOpenMobileMenu}
      openMobileMenu={openMobileMenu}
    />
  );
};

export default NavbarGuestMobile;
