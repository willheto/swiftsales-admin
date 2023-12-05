import React from 'react';
import styled from 'styled-components';

const Content = ({ children }: { children: React.ReactNode }) => {
	return <MainContentContainer>{children}</MainContentContainer>;
};

const MainContentContainer = styled.div`
	background-image: url("data:image/svg+xml,%3Csvg%20stroke='currentColor'%20fill='rgb(16, 37, 38)'%20stroke-width='0'%20viewBox='0%200%2024%2024'%20height='2000'%20width='2000'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cpath%20fill-rule='evenodd'%20d='M18.1029473%2C21.0182797%20C15.2758951%2C22.6513915%2011.388774%2C22.8191853%207.4780286%2C21.143065%20C4.31157263%2C19.7958689%201.6842374%2C17.43767%200%2C14.7432778%20C0.808438798%2C15.4168759%201.7515972%2C15.9559966%202.76211541%2C16.4272729%20C6.80079604%2C18.320253%2010.8386286%2C18.1906218%2013.6802189%2C16.432119%20C13.6784016%2C16.4303017%2013.6771901%2C16.4290902%2013.6759786%2C16.4272729%20C9.63378462%2C13.3282374%206.19795002%2C9.28604337%203.63803517%2C5.98529182%20C3.09885386%2C5.44629224%202.69463446%2C4.77257305%202.29041506%2C4.16627424%20C5.38939007%2C6.99574946%2010.3075644%2C10.5660614%2012.0587981%2C11.5770642%20C8.35400892%2C7.6693475%205.05265163%2C2.81907816%205.18712893%2C2.95355547%20C11.0484011%2C8.88206627%2016.5056356%2C12.2506622%2016.5056356%2C12.2506622%20C16.6861501%2C12.3524288%2016.8254735%2C12.4372343%2016.9375379%2C12.5129535%20C17.0556599%2C12.2124997%2017.1592437%2C11.9005366%2017.2464723%2C11.5770642%20C18.1896307%2C8.14122958%2017.1119949%2C4.23351289%2014.7537961%2C1%20C20.2104248%2C4.30105442%2023.4445434%2C10.4988227%2022.0967416%2C15.6864968%20C22.0616079%2C15.8264259%2022.0234454%2C15.9645377%2021.9822542%2C16.1002266%20C21.9980037%2C16.1190049%2022.0137533%2C16.138389%2022.0295029%2C16.1583789%20C24.7238951%2C19.5269749%2023.9830584%2C23.0972868%2023.6462594%2C22.4236887%20C22.1845759%2C19.5633201%2019.4786744%2C20.4380283%2018.1030079%2C21.0183403%20L18.1029473%2C21.0182797%20Z'%3E%3C/path%3E%3C/svg%3E") !important;
	background-repeat: no-repeat;
	background-position: center;
	padding: 1rem;
	width: calc(100% - 200px);
	display: flex;
	flex-direction: column;
	height: 100%;
	position: relative;
`;

export default Content;