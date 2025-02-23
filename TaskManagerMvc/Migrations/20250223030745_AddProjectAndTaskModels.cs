using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TaskManagerMvc.Migrations
{
    /// <inheritdoc />
    public partial class AddProjectAndTaskModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_Users_UserId",
                table: "Tasks");

            migrationBuilder.RenameColumn(
                name: "status",
                table: "Tasks",
                newName: "Status");

            migrationBuilder.RenameColumn(
                name: "priority",
                table: "Tasks",
                newName: "ProjectId");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Tasks",
                newName: "AssignedToUserId");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Tasks",
                newName: "Name");

            migrationBuilder.RenameIndex(
                name: "IX_Tasks_UserId",
                table: "Tasks",
                newName: "IX_Tasks_AssignedToUserId");

            migrationBuilder.AlterColumn<int>(
                name: "Status",
                table: "Tasks",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Projects",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    StartDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projects", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "UserProjects",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ProjectId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserProjects", x => new { x.UserId, x.ProjectId });
                    table.ForeignKey(
                        name: "FK_UserProjects_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserProjects_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_ProjectId",
                table: "Tasks",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_UserProjects_ProjectId",
                table: "UserProjects",
                column: "ProjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_Projects_ProjectId",
                table: "Tasks",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_Users_AssignedToUserId",
                table: "Tasks",
                column: "AssignedToUserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_Projects_ProjectId",
                table: "Tasks");

            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_Users_AssignedToUserId",
                table: "Tasks");

            migrationBuilder.DropTable(
                name: "UserProjects");

            migrationBuilder.DropTable(
                name: "Projects");

            migrationBuilder.DropIndex(
                name: "IX_Tasks_ProjectId",
                table: "Tasks");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "Tasks",
                newName: "status");

            migrationBuilder.RenameColumn(
                name: "ProjectId",
                table: "Tasks",
                newName: "priority");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Tasks",
                newName: "Title");

            migrationBuilder.RenameColumn(
                name: "AssignedToUserId",
                table: "Tasks",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Tasks_AssignedToUserId",
                table: "Tasks",
                newName: "IX_Tasks_UserId");

            migrationBuilder.AlterColumn<string>(
                name: "status",
                table: "Tasks",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_Users_UserId",
                table: "Tasks",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
