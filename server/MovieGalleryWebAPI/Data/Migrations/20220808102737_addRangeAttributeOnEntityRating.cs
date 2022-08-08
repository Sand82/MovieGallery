using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MovieGalleryWebAPI.Data.Migrations
{
    public partial class addRangeAttributeOnEntityRating : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Raitings_AspNetUsers_UserId",
                table: "Raitings");

            migrationBuilder.DropForeignKey(
                name: "FK_Raitings_Movies_MovieId",
                table: "Raitings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Raitings",
                table: "Raitings");

            migrationBuilder.RenameTable(
                name: "Raitings",
                newName: "Ratings");

            migrationBuilder.RenameIndex(
                name: "IX_Raitings_UserId",
                table: "Ratings",
                newName: "IX_Ratings_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Raitings_MovieId",
                table: "Ratings",
                newName: "IX_Ratings_MovieId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Ratings",
                table: "Ratings",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Ratings_AspNetUsers_UserId",
                table: "Ratings",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Ratings_Movies_MovieId",
                table: "Ratings",
                column: "MovieId",
                principalTable: "Movies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ratings_AspNetUsers_UserId",
                table: "Ratings");

            migrationBuilder.DropForeignKey(
                name: "FK_Ratings_Movies_MovieId",
                table: "Ratings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Ratings",
                table: "Ratings");

            migrationBuilder.RenameTable(
                name: "Ratings",
                newName: "Raitings");

            migrationBuilder.RenameIndex(
                name: "IX_Ratings_UserId",
                table: "Raitings",
                newName: "IX_Raitings_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Ratings_MovieId",
                table: "Raitings",
                newName: "IX_Raitings_MovieId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Raitings",
                table: "Raitings",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Raitings_AspNetUsers_UserId",
                table: "Raitings",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Raitings_Movies_MovieId",
                table: "Raitings",
                column: "MovieId",
                principalTable: "Movies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
