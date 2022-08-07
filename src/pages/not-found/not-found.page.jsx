
const NotFoundPage = () => {
    return (
        <body id="body-error">
            <div id="header"><h1>Server Error</h1></div>
            <div id="content">
                <div id="error-container">
                    <fieldset id="fieldset-error">
                        <h2 id="h2-error">404 - File or directory not found.</h2>
                        <h3 id="h3-error">The resource you are looking for might have been removed, had its name changed, or is temporarily unavailable.</h3>
                    </fieldset>
                </div>
            </div>
        </body>
    );
};

export {NotFoundPage};
