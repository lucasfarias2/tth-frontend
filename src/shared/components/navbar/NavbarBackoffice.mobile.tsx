import { useState } from 'react';
import {
  AnnouncementIcon,
  DashboardIcon,
  ExternalLinkIcon,
  FileIcon,
  InboxIcon,
  UsersIcon,
} from '@/shared/components/ui/icons';
import NavbarLinkMobile from './NavbarLink.mobile';
import NavbarLinkExternalMobile from './NavbarLinkExternal.mobile';
import NavbarWrapperMobile from './NavbarWrapper.mobile';

const NavbarBackofficeMobile = () => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  const accountLinks = (
    <>
      <NavbarLinkMobile
        to="/backoffice/"
        Icon={DashboardIcon}
        label="Dashboard"
        closeMenu={() => {
          setOpenMobileMenu(false);
        }}
      />
      <NavbarLinkMobile
        to="/backoffice/users"
        Icon={UsersIcon}
        label="Users"
        closeMenu={() => {
          setOpenMobileMenu(false);
        }}
      />
      <NavbarLinkMobile
        to="/backoffice/announcements"
        Icon={AnnouncementIcon}
        label="Announcements"
        closeMenu={() => {
          setOpenMobileMenu(false);
        }}
        end
      />
      <NavbarLinkMobile
        to="/backoffice/tickets"
        Icon={InboxIcon}
        label="Tickets"
        closeMenu={() => {
          setOpenMobileMenu(false);
        }}
        end
      />
      <NavbarLinkMobile
        to="/backoffice/features"
        Icon={FileIcon}
        label="Development features"
        closeMenu={() => {
          setOpenMobileMenu(false);
        }}
        end
      />
    </>
  );
  const guestLinks = (
    <>
      <NavbarLinkExternalMobile to="/account" Icon={ExternalLinkIcon} label="Account" />
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

export default NavbarBackofficeMobile;
