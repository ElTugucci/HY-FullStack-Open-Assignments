interface HeaderProps {
  coursesName: string
}

const Header = (props: HeaderProps): JSX.Element => (
  <h1>{props.coursesName}</h1>
);

export default Header;
