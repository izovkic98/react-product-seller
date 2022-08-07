const UnauthorizedPage = () => {
    return (
        <body id="body-error">
            <div id="header"><h1>Unauthorized error</h1></div>
            <div id="content">
                <div id="error-container">
                    <fieldset id="fieldset-error">
                        <h2 id="h2-error">401 - Access to this resource is denied</h2>
                        <h3 id="h3-error">You don't have valid credentials to retrieve requested data.</h3>
                    </fieldset>
                </div>
            </div>
        </body>
    );
};

export {UnauthorizedPage};
