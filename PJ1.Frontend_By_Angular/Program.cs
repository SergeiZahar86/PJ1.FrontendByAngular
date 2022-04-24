using PJ1.Frontend_By_Angular.Configures;

// WebApplicationBuilder builder = WebApplication.CreateBuilder(new WebApplicationOptions()
// {
//     WebRootPath = "ClientAppNew/dist/client-app-new"
// });

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);


WebApplication app = builder.Build();

ConfigureCommon.Configure(app, app.Environment);
app.MapFallbackToFile("index.html");

app.Run();