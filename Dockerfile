FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["AqaraatAPI/AqaraatAPI.csproj", "AqaraatAPI/"]
RUN dotnet restore "AqaraatAPI/AqaraatAPI.csproj"
COPY . .
WORKDIR "/src/AqaraatAPI"
RUN dotnet build "AqaraatAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "AqaraatAPI.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "AqaraatAPI.dll"] 