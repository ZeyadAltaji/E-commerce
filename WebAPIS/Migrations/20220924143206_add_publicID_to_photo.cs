﻿using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPIS.Migrations
{
    public partial class add_publicID_to_photo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.AddColumn<string>(
                name: "PublicId",
                table: "Photos",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
               name: "PublicId",
               table: "Photos");
        }
    }
}
