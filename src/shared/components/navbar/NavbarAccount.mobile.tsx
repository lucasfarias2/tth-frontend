import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import {
  BarChartIcon,
  ConfigurationIcon,
  ExternalLinkIcon,
  FileIcon,
  FrequencyIcon,
  HelpIcon,
  HomeIcon,
  SupportIcon,
} from '@/shared/components/ui/icons';
import EQueryKeys from '@/shared/queries/query-keys';
import NavbarLinkMobile from './NavbarLink.mobile';
import NavbarLinkExternalMobile from './NavbarLinkExternal.mobile';
import NavbarWrapperMobile from './NavbarWrapper.mobile';

const NavbarAccountMobile = () => {
  const queryClient = useQueryClient();
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const user = queryClient.getQueryData([EQueryKeys.User]) as TTHUser;

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
      <NavbarLinkMobile
        to="/account/support"
        Icon={SupportIcon}
        label="Support"
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
      {user?.is_staff && <NavbarLinkExternalMobile to="/backoffice" Icon={ExternalLinkIcon} label="Backoffice" />}
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
