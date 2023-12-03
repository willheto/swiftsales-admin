import React from 'react';
import styled from 'styled-components';

const Content = ({ children }: { children: React.ReactNode }) => {
	return <MainContentContainer>{children}</MainContentContainer>;
};

const MainContentContainer = styled.div`
	padding: 1rem;
	width: 100%;
	background-color: white;
`;

export default Content;
