const AppSideBar = () => {
  return (
    <ul>
      <li>
        <a href="#" data-mdb-ripple="true" data-mdb-ripple-color="dark">
          Sidenav link 1
        </a>
      </li>
      <li>
        <a href="#" data-mdb-ripple="true" data-mdb-ripple-color="dark">Sidenav link 2</a>
      </li>
      <li className="relative">
        <a href="#" data-mdb-ripple="true" data-mdb-ripple-color="dark">Sidenav link 2</a>
      </li>
    </ul>
  );
};

export default AppSideBar;