const React = require('react');

const OutletContext = React.createContext(null);

module.exports = {
  BrowserRouter: ({ children }) => React.createElement('div', null, children),
  MemoryRouter: ({ children }) => React.createElement('div', null, children),
  Routes: ({ children }) => {
    const routes = React.Children.toArray(children);
    for (const route of routes) {
      if (route.props?.element) {
        if (route.props.children) {
          const childElements = React.Children.map(route.props.children, child =>
            child?.props?.element || null
          ).filter(Boolean);
          return React.createElement(
            OutletContext.Provider,
            { value: childElements },
            route.props.element
          );
        }
        return route.props.element;
      }
    }
    return null;
  },
  Route: ({ element }) => element || null,
  Link: ({ to, children, ...props }) => React.createElement('a', { href: to, ...props }, children),
  NavLink: ({ to, children, ...props }) => React.createElement('a', { href: to, ...props }, children),
  Outlet: () => {
    const context = React.useContext(OutletContext);
    return context || null;
  },
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: '/', search: '', hash: '', state: null }),
  useParams: () => ({}),
  useSearchParams: () => [new URLSearchParams(), jest.fn()],
};
