'use client';

import React, { Fragment } from 'react';
import {
	Menubar,
	MenubarCheckboxItem,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarRadioGroup,
	MenubarRadioItem,
	MenubarSeparator,
	MenubarShortcut,
	MenubarSub,
	MenubarSubContent,
	MenubarSubTrigger,
	MenubarTrigger,
} from '@/components/ui/menubar';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

const Header = () => {
	const { data: session } = useSession();
	const { theme, themes, setTheme } = useTheme();

	console.log('session => ', session);

	return (
		<div className="w-full">
			<Menubar className="w-full flex">
				<MenubarMenu>
					<MenubarTrigger>File</MenubarTrigger>
					<MenubarContent>
						<MenubarItem>
							New Tab <MenubarShortcut>⌘T</MenubarShortcut>
						</MenubarItem>
						<MenubarItem>
							New Window <MenubarShortcut>⌘N</MenubarShortcut>
						</MenubarItem>
						<MenubarItem disabled>New Incognito Window</MenubarItem>
						<MenubarSeparator />
						<MenubarSub>
							<MenubarSubTrigger>Share</MenubarSubTrigger>
							<MenubarSubContent>
								<MenubarItem>Email link</MenubarItem>
								<MenubarItem>Messages</MenubarItem>
								<MenubarItem>Notes</MenubarItem>
							</MenubarSubContent>
						</MenubarSub>
						<MenubarSeparator />
						<MenubarItem>
							Print... <MenubarShortcut>⌘P</MenubarShortcut>
						</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
				<MenubarMenu>
					<MenubarTrigger>Edit</MenubarTrigger>
					<MenubarContent>
						<MenubarItem>
							Undo <MenubarShortcut>⌘Z</MenubarShortcut>
						</MenubarItem>
						<MenubarItem>
							Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
						</MenubarItem>
						<MenubarSeparator />
						<MenubarSub>
							<MenubarSubTrigger>Find</MenubarSubTrigger>
							<MenubarSubContent>
								<MenubarItem>Search the web</MenubarItem>
								<MenubarSeparator />
								<MenubarItem>Find...</MenubarItem>
								<MenubarItem>Find Next</MenubarItem>
								<MenubarItem>Find Previous</MenubarItem>
							</MenubarSubContent>
						</MenubarSub>
						<MenubarSeparator />
						<MenubarItem>Cut</MenubarItem>
						<MenubarItem>Copy</MenubarItem>
						<MenubarItem>Paste</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
				<MenubarMenu>
					<MenubarTrigger>View</MenubarTrigger>
					<MenubarContent>
						<MenubarCheckboxItem>
							Always Show Bookmarks Bar
						</MenubarCheckboxItem>
						<MenubarCheckboxItem checked>
							Always Show Full URLs
						</MenubarCheckboxItem>
						<MenubarSeparator />
						<MenubarItem inset>
							Reload <MenubarShortcut>⌘R</MenubarShortcut>
						</MenubarItem>
						<MenubarItem disabled inset>
							Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
						</MenubarItem>
						<MenubarSeparator />
						<MenubarItem inset>Toggle Fullscreen</MenubarItem>
						<MenubarSeparator />
						<MenubarItem inset>Hide Sidebar</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
				<MenubarMenu>
					<MenubarTrigger>Theme</MenubarTrigger>
					<MenubarContent>
						<MenubarRadioGroup value={theme}>
							{themes.map((item) => {
								return (
									<MenubarRadioItem
										key={item}
										value={item}
										onClick={() => setTheme(item)}
									>
										{item}
									</MenubarRadioItem>
								);
							})}

							{/* <MenubarRadioItem value="dark">
								Luis
							</MenubarRadioItem>
							<MenubarRadioItem value="system">
								Luis
							</MenubarRadioItem> */}
						</MenubarRadioGroup>
						{/* <MenubarSeparator /> */}
					</MenubarContent>
				</MenubarMenu>
				{/* <MenubarMenu>
					<MenubarTrigger>Profiles</MenubarTrigger>
					<MenubarContent>
						<MenubarRadioGroup value="benoit">
							<MenubarRadioItem value="andy">
								Andy
							</MenubarRadioItem>
							<MenubarRadioItem value="benoit">
								Benoit
							</MenubarRadioItem>
							<MenubarRadioItem value="Luis">
								Luis
							</MenubarRadioItem>
						</MenubarRadioGroup>
						<MenubarSeparator />
						<MenubarItem inset>Edit...</MenubarItem>
						<MenubarSeparator />
						<MenubarItem inset>Add Profile...</MenubarItem>
					</MenubarContent>
				</MenubarMenu> */}
				<div className="flex-grow"></div>
				<MenubarMenu>
					<MenubarTrigger>Account</MenubarTrigger>
					<MenubarContent>
						{/* <MenubarRadioGroup value="benoit">
							<MenubarRadioItem value="andy"></MenubarRadioItem>
							<MenubarRadioItem value="benoit">
								Benoit
							</MenubarRadioItem>
							<MenubarRadioItem value="Luis">
								Luis
							</MenubarRadioItem>
						</MenubarRadioGroup>
						<MenubarSeparator /> */}

						{session?.user && (
							// <MenubarItem inset>
							// 	{session?.user?.name}
							// </MenubarItem>
							<MenubarItem>
								{session?.user?.username}{' '}
								<MenubarShortcut>
									<Image
										src={session?.user?.image!}
										alt={session.user.name!}
										height={24}
										width={24}
										className="aspect-square rounded-full"
									/>
								</MenubarShortcut>
							</MenubarItem>
						)}
						{session?.user && <MenubarSeparator />}
						{session?.user ? (
							<MenubarItem onClick={() => signOut()}>
								Sign Out
							</MenubarItem>
						) : (
							<MenubarItem onClick={() => signIn('github')}>
								Sign In
							</MenubarItem>
						)}
					</MenubarContent>
				</MenubarMenu>
			</Menubar>
		</div>
	);
};

export default Header;
