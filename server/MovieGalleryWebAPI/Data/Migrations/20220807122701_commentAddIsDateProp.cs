﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MovieGalleryWebAPI.Data.Migrations
{
    public partial class commentAddIsDateProp : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsDelete",
                table: "Comments",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDelete",
                table: "Comments");
        }
    }
}
