# ASPNET_GULP
Using GULP and NPM for a cohesive work flow

ASP.NET Core 2.1 Razor projects have many niche features that help with a developer's work flow.  This examines a few of those options in a tutorial for Dream.In.Code.

=================
dreamincode.net tutorial backup ahead of decommissioning

 Posted 16 January 2019 - 11:04 PM 

[u]Requirements:[/u]
Visual Studio 2017
Core 2.1 / Razor pages
C#

[u]github[/u]
https://github.com/modi1231/ASPNET_GULP/

Concepts
-- C#
-- Core 2.1 / Razor pages
-- GULP
-- NPM

There are many ways to elevate your project game.  Some with better tools, some with widgets, and some with laying down a solid work flow.  Sure, for the small one-off, throw away project, this may be over kill, but for larger projects - where you need to maintain a sense of order and stability - a good work flow is invaluable.

Looking through the various options I found a path that was the most stable and provided me with an array of options.  Take my hand and let me lead you through the weeds into a new garden of awesome.

I opted to use NPM and GULP to cleave a path of rightness through my projects.  NPM provides the host of NodeJS projects to use, and GULP helps to execute them.  I primarily use Gulp with the 'Task Explorer' tool built into Visual Studios 2017.  It's seamless and easily replicated from project to project.

1.  The first thing needed is the PowerShell tools.  Powershell is the equivalent of linux shell scripting, but primarily for windows.  There's a whole host of task automation yuou can delve into, but for now I need it to get NPM installed.
https://docs.microsoft.com/en-us/powershell/scripting/overview?view=powershell-6

Open up Visual Studios 2017 -> tools -> 'extensions and updates' -> online and searhcing for 'powershell tools for Visual Studios'.

2.  NodeJS provides me with NPM and it's a one time install.  
Head to https://nodejs.org/en/ and install it.

3.  With the one time tasks let's create a new Razor project.  I keep them empty to minimize kruft from VS if I were to use a sample project and par it down from there.

Visual Studio -> Visual C# -> Web -> ASP.NET Core.  Empty project, Core 2.1.

4.  In the project, create a folder called 'Data' and one called 'Pages'.  I keep my data objects and data access class in the 'data' folder, and the Razor pages in 'Pages'.

4.1 Inside 'pages' add a 'Shared' folder.

5.  With a blank project there is no MVC routing and that's simply setup with tweaking the 'startup.cs'.  Remove the 'app.run' and add:
[code]
            app.UseStaticFiles();
            app.UseMvc();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });[/code]

In the 'configure services' function, add this line:

[code]            services.AddMvc();[/code]

6.  Installing Gulp is a project-to-project task.  Open up your Powershell window using the 'quick launch' or View -> other windows -> PowerShell Interactive.

[code]Run: npm install gulp -g[/code]

7.  To have NPM manage file dependencies I add a NPM config file in the root of hte project.
project -> add -> new item -> visual c# -> asp.net core -> web - npm config file.  

Keep the name 'package.json' as is.  VS know's what's up with it.

This is also where we tell Gulp what functionality is available and later how to use it.
https://www.npmjs.com/package/gulp

In package.json opens up a world of options for you.  You can specify dependencies for only development or for production.  Specific versions for packages or the latest.  One spot shop.  A good example would be to use minifying of CSS for prod, but less so for dev.

Clicking your project you can see the node package folder by doing a 'show al files' and the 'node_modules' appears.  Feel free to dig into those and see what is available.

8.  My go to is in 'dev dependencies' - of the 'package.json' -  and add the following: bootstrap, jquery, del, and gulp.

[code]  "devDependencies": {
    "gulp": "4.0.0",
    "del": "3.0.0",
    "bootstrap": "4.2.1",
    "jquery": "3.3.1"
  }[/code]

9.  To make the Gulp file add a JS file in the root called 'gulpfile.js'.  Again, VS picks up on a known file type and knows what to do.
https://docs.microsoft.com/en-us/aspnet/core/client-side/using-gulp?view=aspnetcore-2.2

10.  A quick aside - in the wwwroot folder at two folders at the same level:  'css' and 'js'.  These will hold the bootstrap and jquery files to be used in the _layout later.

11.  Gulp is an interesting beast with areas to bolt into your VS workflow.  There are four main areas to bind a Gulp task to:

Before Build - tasks done before VS kicks off a build.
After Build - not shocking - things to do after a build.
Clean - when you right click -> clean a project.
Project Open - trigger on project opening.

Typically I use a lot of 'before build' to clean out old CSS, JS, and later minifiy/uglify them into one file for production.

11.1  Visual Studios sees your gulp tasks in the 'task runner' which can be reached multiple ways.  Easiest - right click on gulpfile.js -> task runner explorer.  Alternatively you can type 'task runner explorer' in the quick launch, or find it under 'tools'.

You can run a whole bunch of tasks at a specific time or run them individually with a mouse click.

11.2  The gulpfile starts with explaining the binding.  

[code]/// <binding BeforeBuild='' />[/code]

More reading:
https://coursetro.com/posts/design/72/Installing-Bootstrap-4-Tutorial
https://docs.microsoft.com/en-us/aspnet/core/client-side/using-gulp?view=aspnetcore-2.2


11.3  One of the main tasks I have Gulp do is keep bootstrap and jquery in the right folders to reference in my layout.
11.3.1  Start by declaring a global handle to gulp.
var gulp = require('gulp');

Then create a gulp task, give it a name ('jquery' in this example), and tell it where to find the source for jquery js and bootstrap, and pipe that into a destination folder.  I know the source location because I looked into the hidden 'node_modules' folder.

[code]gulp.task('jquery', function ()
{
    gulp.src(["node_modules/jquery/dist/jquery.js"])
        .pipe(gulp.dest("wwwroot/js"));

    gulp.src(["node_modules/bootstrap/dist/js/bootstrap.min.js"])
        .pipe(gulp.dest("wwwroot/js"));
});[/code]

11.3.2.  Similarly I do the same with bootstrap's css.
[code]gulp.task('bootstrap_css', function ()
{
    gulp.src(["node_modules/bootstrap/dist/css/bootstrap.css"])
        .pipe(gulp.dest("wwwroot/css"));
});[/code]

You should be able to now run each task and see the three files appear in their correct folders!

11.3.3  In the 'task runner' you can right click on tasks and bind them to one of the four bind areas mentioned above.

When I bind mine to 'before build' VS updates my header to look like this:
[code]/// <binding BeforeBuild='bootstrap_css, jquery' />[/code]

11.4  Typically I also add a 'clean' that removes old bootstrap and css.  Mind you this is a 'nuke it from orbit' so if you have any custom CSS/JS either have them in a different folder or specify file names.

12.  Wrapping up the project setup I: create a folder called 'Pages' with a sub folder 'Shared'.

13.  In the 'Shared' add a layout.  Add new item -> visual c# -> asp.net core -> web -> razor layout.  Keep the file name: _Layout.cshtml

13.1  Open _Layout.cshtml up and drag your CSS and JS from the wwwroot folders into the 'head' tags.  Boom!  Setup, and ready to rock for every Razor page added!

14.  In the 'Pages' folder add your first razor page - index.  

From here I am pretty well locked in and ready to rock, but to quote Jill Sobule, "I think I can do better!".

For extra effort flip to you _layout.cshtml.  You can add environment specific sections so your unminified code 

In the head you can add environment tags like these:

[code]    <environment include="Development">
        <link href="~/css/bootstrap.css" rel="stylesheet" />
        <script src="~/js/bootstrap.min.js"></script>
        <script src="~/js/jquery.js"></script>
    </environment>
    <environment exclude="Development">
        @*minified scripts here*@
    </environment>[/code]

Now that's cooking with some gas!

If you are hankering for an example of how to have gulp minify your CSS follow these steps.

1.  In your package.json add a reference to gulp-csso
https://www.npmjs.com/package/gulp-csso

2.  In the gulpfile.js create a variable for your csso
[code]var gulpcsso = require('gulp-csso');[/code]

3.  Create a folder called 'prod' under wwwroot.

4.  Create a gulp task that takes the source for your development css, pipes that into your csso variable, feed it some options, and pipe it out all to your prod folder.

[code]gulp.task('gulpcsso', function ()
{
    return gulp.src('wwwroot/css/*.css')
        .pipe(gulpcsso({
            restructure: false,
            sourceMap: true,
            debug: true
        }))
        .pipe(gulp.dest('wwwroot/prod'));
});[/code]

You can follow that up by having a 'clean prod' task so every time you build a clean version is placed in that folder!

[code]gulp.task('cleanprod', function ()
{
    return del(["wwwroot/prod/*.*"]);
});[/code]

Lastly - I mentioned SASS a few times. https://sass-lang.com/  I have been dabbling with going forward and using the extension language of CSS and GULP helps automate the bulk of that.  There are a whole host of interesting features (mixins, variables, nesting, etc) that I find appealing.

https://www.mugo.ca/Blog/7-benefits-of-using-SASS-over-conventional-CSS

[u]Advanced: [/u]
-- Explore ways to minify (uglify) your JS or compress multiple files into one
-- Explore SASS and see how to use GULP to pipe your files into SASS formatting.
