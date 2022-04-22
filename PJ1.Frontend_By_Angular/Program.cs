using PJ1.Frontend_By_Angular.Configures;

WebApplicationBuilder builder = WebApplication.CreateBuilder(new WebApplicationOptions()
{
    WebRootPath = "ClientApp/dist/client-app"
});

WebApplication app = builder.Build();

ConfigureCommon.Configure(app, app.Environment);

app.Run();