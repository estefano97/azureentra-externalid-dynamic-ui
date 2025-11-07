using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);
Microsoft.IdentityModel.Logging.IdentityModelEventSource.ShowPII = true;

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        // Construimos el Authority dinámicamente con tus variables
        options.Authority = "https://4c10e39b-41cf-4968-bdee-6a0dc0d176cc.ciamlogin.com/4c10e39b-41cf-4968-bdee-6a0dc0d176cc/v2.0";

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            // Esta debe coincidir exactamente con el "aud" del token
            ValidateIssuerSigningKey = false, // solo para debug
            ValidAudiences = new[]
            {
                $"api://{builder.Configuration["AzureAd:ClientId"]}",
                builder.Configuration["AzureAd:ClientId"]
            },
            ValidIssuers = new[]
            {
                // 1️ issuer por Tenant ID
                $"https://{builder.Configuration["AzureAd:TenantId"]}.ciamlogin.com/{builder.Configuration["AzureAd:TenantId"]}/v2.0",

                // 2️ issuer por dominio (branding del tenant)
                $"https://polimortfismpractice.ciamlogin.com/{builder.Configuration["AzureAd:Domain"]}/v2.0"
            }

        };
    });

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy
            .AllowAnyOrigin()    // permite cualquier dominio
            .AllowAnyHeader()    // permite cualquier header
            .AllowAnyMethod();   // permite GET, POST, PUT, DELETE, etc.
    });
});


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
