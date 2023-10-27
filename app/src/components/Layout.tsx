import { User } from '@/types';
import React, { useEffect, useState } from 'react';
import UserDetail from './UserDetail';
import UserList from './UserList';

const Layout = ({ children }: { children?: any }) => {
	//local states
	const [page, setPage] = useState<number>(1);
	const [currentPageUserList, setCurrentPageUserList] = useState<User[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [selectedUser, setSelectedUser] = useState<User | null>(null);

	//local functions
	const getUserList = async () => {
		setLoading(true);
		const res = await fetch(
			`https://randomuser.me/api/?page=${page}&results=20`
		);
		const resJson = await res.json();
		if (resJson?.results?.length) {
			setCurrentPageUserList(resJson?.results);
		}
		setLoading(false);
	};

	//effects
	useEffect(() => {
		getUserList();
	}, [page]);
	return (
		<div className="flex flex-row">
			<div className="w-1/3">
				<UserList
					page={page}
					setPage={setPage}
					loading={loading}
					userList={currentPageUserList}
					selectedUser={selectedUser}
					setSelectedUser={setSelectedUser}
				/>
			</div>
			<div className="w-2/3">
				<UserDetail selectedUser={selectedUser} />
			</div>
		</div>
	);
};

export default Layout;
