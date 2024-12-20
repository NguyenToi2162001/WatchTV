import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { CategoriesProvider } from './context/CategoriesProvider';
import { ActorsProvider } from './context/ActorsProvider';
import { NotificationProvider } from './context/NotificationProvider';
import { AuthorsProvider } from './context/AuthorProvider';
import { CharactorsProvider } from './context/CharactorsProvider';
import { PlansProvider } from './context/PlansProvider';
import { MoviesProvider } from './context/MoviesProvider';
import { EpisodesProvider } from './context/EpisodesProvider';
import { TrailerProvider } from './context/TrailersProvider';
import { SignUpsProvider } from './context/SignUpProvider';
import { AuthsProvider } from './context/AuthsProvider';
import { PeaturesProvider } from './context/PeaturesProvider';
import { PackagesProvider } from './context/PackagesProvider';
import { FavoritesProvider } from './context/FavoritesProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <NotificationProvider>
        <CategoriesProvider>
          <ActorsProvider>
            <AuthorsProvider>
              <CharactorsProvider>
                <PlansProvider>
                  <MoviesProvider>
                    <EpisodesProvider>
                      <TrailerProvider>
                        <SignUpsProvider>
                          <AuthsProvider>
                            <PeaturesProvider>
                              <PackagesProvider>
                                <FavoritesProvider>
                                  <App />
                                </FavoritesProvider>
                              </PackagesProvider>
                            </PeaturesProvider>
                          </AuthsProvider>
                        </SignUpsProvider>
                      </TrailerProvider>
                    </EpisodesProvider>
                  </MoviesProvider>
                </PlansProvider>
              </CharactorsProvider>
            </AuthorsProvider>
          </ActorsProvider>
        </CategoriesProvider>
      </NotificationProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
