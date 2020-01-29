import React from "react";
import {
  createFetcher,
  statuses,
  swapiEndpoint,
  pokeapiEndpoint
} from "./createFetcher";
import "./App.css";

const DataViewer = ({ className, title }) => {
  // Setup each DataViewer's local state
  const { actions, reducer, initialState } = createFetcher();
  const [state, dispatch] = React.useReducer(reducer, initialState);

  // Only fetch data when we're in the "fetching" state
  React.useEffect(() => {
    const endpoint = title === "Star Wars" ? swapiEndpoint : pokeapiEndpoint;

    if (state.status === statuses.fetching) {
      fetch(endpoint)
        .then(res => res.json())
        .then(data => {
          // TODO: Consider when user cancels while data is fetching
          dispatch(actions.success(data));
        })
        .catch(error => {
          dispatch(actions.error(error.message));
        });
    }
  }, [state, actions, title]);

  const renderContent = () => {
    switch (state.status) {
      case statuses.idle: {
        const buttonText =
          title === "Star Wars" ? "I am your fetcher!" : "Gotta fetch 'em all!";

        return (
          <div>
            <button
              onClick={() => {
                dispatch(actions.fetch);
              }}
            >
              {buttonText}
            </button>
          </div>
        );
      }

      case statuses.fetching:
        return <h2>Loading...</h2>;

      case statuses.error:
        return (
          <div>
            <h2>Something went wrong! {state.message}</h2>
            <button
              className="beef try-again"
              onClick={() => {
                dispatch(actions.fetch);
              }}
            >
              Try again?
            </button>
          </div>
        );

      case statuses.success:
        return state.data.results.map(d => (
          <li key={d.name}>
            <h3>{d.name}</h3>
          </li>
        ));

      default:
        return <code>This case should never happen</code>;
    }
  };

  return (
    <section className={className}>
      <header>
        <h2>{title}</h2>
      </header>

      <ul>{renderContent()}</ul>
    </section>
  );
};

function App() {
  return (
    <>
      <header>
        <h1>Multiversal Data Fetcher</h1>
      </header>

      <main>
        <DataViewer title="Star Wars" className="star-wars" />
        <DataViewer title="Pokémon" className="pokemon" />
      </main>
    </>
  );
}

export default App;
