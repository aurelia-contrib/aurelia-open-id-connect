/* TODO: Create a value converter that filters the naviation based on the
 * the current user's role. Usage will look something like this:

    <ul>
    <li repeat.for="nav of router.navigation | openIdConnectRoleFilter">
        <a href.bind="nav.href">${nav.title}</a>
    </li>
    <li><open-id-connect-user-block></open-id-connect-user-block></li>
    </ul>

 */
