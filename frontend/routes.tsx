import Placeholder from 'Frontend/components/placeholder/Placeholder.js';
import {AccessProps} from 'Frontend/useAuth.js';
import AuthControl from 'Frontend/views/AuthControl.js';
import LoginView from 'Frontend/views/login/LoginView.js';
import MainLayout from 'Frontend/views/MainLayout.js';
import {lazy} from 'react';
import {createBrowserRouter, IndexRouteObject, LoaderFunction, NonIndexRouteObject, useMatches} from 'react-router-dom';
import TopicMainView, {topicsLoader} from "Frontend/views/topic/TopicMainView.js";
import TopicDetailsView, {topicDetailsLoader} from "Frontend/views/topic/TopicDetailsView.js";

const AboutView = lazy(async () => import('Frontend/views/about/AboutView.js'));
export type MenuProps = Readonly<{
    icon?: string;
    title?: string;
}>;

//https://github.com/remix-run/react-router/discussions/9792
export type LoaderData<TLoaderFn extends LoaderFunction> = Awaited<ReturnType<TLoaderFn>> extends Response | infer D
    ? D
    : never;

export type ViewMeta = Readonly<{ handle?: MenuProps & AccessProps }>;

type Override<T, E> = Omit<T, keyof E> & E;

export type IndexViewRouteObject = Override<IndexRouteObject, ViewMeta>;
export type NonIndexViewRouteObject = Override<
    Override<NonIndexRouteObject, ViewMeta>,
    {
        children?: ViewRouteObject[];
    }
>;
export type ViewRouteObject = IndexViewRouteObject | NonIndexViewRouteObject;

type RouteMatch = ReturnType<typeof useMatches> extends (infer T)[] ? T : never;

export type ViewRouteMatch = Readonly<Override<RouteMatch, ViewMeta>>;

export const useViewMatches = useMatches as () => readonly ViewRouteMatch[];

export const routes: readonly ViewRouteObject[] = [
    {
        element: (
            <AuthControl fallback={<Placeholder/>}>
                <MainLayout/>
            </AuthControl>
        ),
        handle: {icon: 'null', title: 'Main'},
        children: [
            {
                path: '/',
                loader: topicsLoader,
                element: <TopicMainView/>,
                handle: {icon: 'globe-solid', title: 'Hello React', requiresLogin: true},
            },
            {path: '/about', element: <AboutView/>, handle: {icon: 'file', title: 'About', requiresLogin: true}},
            {
                path: '/topic/:topicId',
                element: <TopicDetailsView/>,
                loader: topicDetailsLoader,
                handle: {icon: 'null', title: 'Topic Details', requiresLogin: true}
            },
        ],
    },
    {path: '/login', element: <LoginView/>, handle: {icon: 'null', title: 'Login', requiresLogin: true}}
];

const router = createBrowserRouter([...routes]);
export default router;
