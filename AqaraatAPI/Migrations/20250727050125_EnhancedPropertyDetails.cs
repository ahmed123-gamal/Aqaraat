using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AqaraatAPI.Migrations
{
    /// <inheritdoc />
    public partial class EnhancedPropertyDetails : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsAvailable",
                table: "Properties",
                newName: "IsMixed");

            migrationBuilder.AddColumn<string>(
                name: "AltText",
                table: "PropertyVideos",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Duration",
                table: "PropertyVideos",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsMain",
                table: "PropertyVideos",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "OrderIndex",
                table: "PropertyVideos",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ThumbnailUrl",
                table: "PropertyVideos",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Type",
                table: "PropertyVideos",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "AltText",
                table: "PropertyImages",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "OrderIndex",
                table: "PropertyImages",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Type",
                table: "PropertyImages",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "DistanceFromCityCenter",
                table: "Properties",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "DistanceFromUniversity",
                table: "Properties",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "HasAirConditioning",
                table: "Properties",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HasAppliances",
                table: "Properties",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HasCCTV",
                table: "Properties",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HasFurniture",
                table: "Properties",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HasGarden",
                table: "Properties",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HasGuard",
                table: "Properties",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HasHeating",
                table: "Properties",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HasInternet",
                table: "Properties",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HasSatellite",
                table: "Properties",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HasSecurity",
                table: "Properties",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HasTerrace",
                table: "Properties",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsFemaleOnly",
                table: "Properties",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsMaleOnly",
                table: "Properties",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<decimal>(
                name: "KitchenSize",
                table: "Properties",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Landmark",
                table: "Properties",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "LivingRoomSize",
                table: "Properties",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "NumberOfBathrooms",
                table: "Properties",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "NumberOfKitchens",
                table: "Properties",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "NumberOfLivingRooms",
                table: "Properties",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Properties",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TotalFloors",
                table: "Properties",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "Properties",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AltText",
                table: "PropertyVideos");

            migrationBuilder.DropColumn(
                name: "Duration",
                table: "PropertyVideos");

            migrationBuilder.DropColumn(
                name: "IsMain",
                table: "PropertyVideos");

            migrationBuilder.DropColumn(
                name: "OrderIndex",
                table: "PropertyVideos");

            migrationBuilder.DropColumn(
                name: "ThumbnailUrl",
                table: "PropertyVideos");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "PropertyVideos");

            migrationBuilder.DropColumn(
                name: "AltText",
                table: "PropertyImages");

            migrationBuilder.DropColumn(
                name: "OrderIndex",
                table: "PropertyImages");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "PropertyImages");

            migrationBuilder.DropColumn(
                name: "DistanceFromCityCenter",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "DistanceFromUniversity",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "HasAirConditioning",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "HasAppliances",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "HasCCTV",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "HasFurniture",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "HasGarden",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "HasGuard",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "HasHeating",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "HasInternet",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "HasSatellite",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "HasSecurity",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "HasTerrace",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "IsFemaleOnly",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "IsMaleOnly",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "KitchenSize",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "Landmark",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "LivingRoomSize",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "NumberOfBathrooms",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "NumberOfKitchens",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "NumberOfLivingRooms",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "TotalFloors",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "Properties");

            migrationBuilder.RenameColumn(
                name: "IsMixed",
                table: "Properties",
                newName: "IsAvailable");
        }
    }
}
