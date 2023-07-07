import { useState } from 'react';
import {
  BarChartIcon,
  ConfigurationIcon,
  FileIcon,
  FrequencyIcon,
  HelpIcon,
  HomeIcon,
} from '@/shared/components/ui/icons';
import NavbarLinkMobile from './NavbarLink.mobile';
import NavbarLinkExternalMobile from './NavbarLinkExternal.mobile';
import NavbarWrapperMobile from './NavbarWrapper.mobile';

const NavbarAccountMobile = () => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  const accountLinks = (
    <>
      <NavbarLinkMobile
        to="/account/"
        Icon={HomeIcon}
        label="Dashboard"
        closeMenu={() => {
          setOpenMobileMenu(false);
        }}
      />
      <NavbarLinkMobile
        to="/account/habits"
        Icon={FrequencyIcon}
        label="My habits"
        closeMenu={() => {
          setOpenMobileMenu(false);
        }}
      />
      <NavbarLinkMobile
        to="/account/stats"
        Icon={BarChartIcon}
        label="My statistics"
        closeMenu={() => {
          setOpenMobileMenu(false);
        }}
        end
      />
      <NavbarLinkMobile
        to="/account/settings"
        Icon={ConfigurationIcon}
        label="My settings"
        closeMenu={() => {
          setOpenMobileMenu(false);
        }}
        end
      />
    </>
  );
  const guestLinks = (
    <>
      <NavbarLinkExternalMobile to="/roadmap" Icon={FileIcon} label="Development roadmap" subLabel="What's next?" />
      <NavbarLinkExternalMobile to="/contact" Icon={HelpIcon} label="Contact us" subLabel="Need help?" />
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

export default NavbarAccountMobile;
