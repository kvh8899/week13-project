"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkUpdate(
      "Posts",
      {
        mainText: `In this post I’ll be explaining how to get started modding Minecraft. For the sake of this tutorial I’ll be working with Minecraft 1.7.10 (which I’m rather familiar with modding for). Ahead, we’ll get the tools needed to mod Minecraft, setup a mod project, and create our own custom block: “Amethyst Ore” from which we’ll be able to mine Amethyst and we’ll mod this block such that it generates randomly throughout the map. I’ll recommend that you meet the following prerequisites to get the most out of this guide:

- A cursory knowledge of object-oriented Java programming would be incredibly useful but isn’t necessarily required. We’ll be writing more than a few dozen lines of Java code across a handful of classes though so if you have an idea of how to code it will make things easier.
- An understanding of how to use Minecraft Forge. As a requirement, you’ll need to understand how to install Minecraft Forge and how to install mods for it, otherwise, how would you test your mod?

> Want to read this story later? Save it in Journal.

Thankfully, both object-oriented Java programming and Minecraft Forge usage already have countless tutorials available online, so if you’d like to try following along with this guide and refer to Google for other such tutorials if you need some supporting information.

Let’s have a quick overview first. I’ve broken this guide down into five steps, although the steps are not equal: they vary in difficulty, and they grow in size until we reach step 5, which is where we’ll really get into the “modding” part and so it’s the biggest step by far. The steps are:

- [Step 1] **Getting Your Tools: Java & Eclipse**
- [Step 2] **Getting Your Tools: Forge**
- [Step 3] **Setting up Your Eclipse Project**
- [Step 4] **Decompiling Minecraft**
- [Step 5] **Modifying Minecraft**

## [Step 1] Getting Your Tools: Java & Eclipse

First things first — you’re going to need the Java Development Kit (JDK). You can find it on Oracle’s website here. As Oracle puts it on their website: “The JDK is a development environment for building applications, applets, and components using the Java programming language.” To explain a bit on that, you might think of your Minecraft mod as a “component” in that context.

In any case, once you’ve installed the Java Development Kit, next you’ll need the Eclipse IDE. An “IDE” is an Integrated Development Environment, and at a first glance you might think IDE’s are fancy text editors for writing code in, although they have a lot of features to help us with our programming beyond that.

In any case, the Eclipse IDE is our go-to tool and is perhaps the most popular IDE for writing Java. Download the Eclipse installer here, and when you start it up, you should get prompted with a window.

You’ll want to select the first choice: **“Eclipse IDE for Java Developers”**. For those of you who are all-new to this: Minecraft’s code is written in the Java programming language so as a result this is the programming language we’ll be working with to create mods for it. The Eclipse installer is quite straightforward, you can just follow along accepting the standard options and select “Launch” once it has completed. Finally, when the installation is over and the Eclipse Launcher starts up it will prompt you to select a directory for your workspace, I’m naming mine “MinecraftWorkspace”.

Feel free to check the *“Use this as the default and do not ask again”* box if you’ll only be using Eclipse for your Minecraft modding, as you’ll be able to manage multiple projects in this workspace. Otherwise, click that Launch button at the bottom and we’re ready to move on to the next step.

## [Step 2] Getting Your Tools: Forge

Now we’ll need to get Minecraft Forge, in particular we’ll want the 1.7.10 Minecraft Forge as we’ll be modding Minecraft 1.7.10. It’s important that the versions match up, trust me. Head [here](https://files.minecraftforge.net/maven/net/minecraftforge/forge/index_1.7.10.html) to get the most recent version of Minecraft Forge for 1.7.10.

This is the Minecraft Forge website, you’ll notice there are several downloads available. This time around, ignore the “Windows Installer” and download the “Src”. It will be a .zip file, extract this and drag the resulting folder into your MinecraftWorkspace directory that we created with Eclipse in the previous step.

## [Step 3] Setting up Your Eclipse Project

Back in Eclipse, assuming you’ve left it running, you should find yourself at the ‘Welcome’ screen. From here, simply click File -> Open Projects from File System… and then navigate to your Minecraft Forge directory which you’ve just placed in your MinecraftWorkspace directory in the previous step.

Once you’ve selected your Forge directory, click the Finish button.

If, for whatever reason, this view doesn’t appear for you automatically, just navigate to Window -> Show View -> Package Explorer. In any case, you should be seeing that we have an ExampleMod.java file — an example mod for Minecraft, however you should be seeing that it has a number of errors. Let’s fix these.

***[EDIT (December 2020)]:*** Before proceeding to Step 4 you will need to make some quick fixes to your build.gradle file due to changes that require Gradle to now use HTTPS instead of HTTP. See **[this Git-Hub Gist](https://gist.github.com/Arzio/848b8375c4c2ff828d5a7470ac1866b6)** for an example build.gradle file with the fixes you’ll need to get going. (Take notice of the comments in that example file on lines 1, 6, and 25).

## [Step 4] Decompiling Minecraft

Let’s open up our MinecraftWorkspace directory and do a Shift+Right Click on our Forge folder, selecting the “Open PowerShell window here” option to start up PowerShell.

Here we’ll enter:

> .\\gradlew tasks

This will show us all the available tasks we can run, there are quite a few, but we’re most interested in running “setupDecompWorkspace” so let’s go ahead and do that by entering:

> .\\gradlew setupDecompWorkspace

This command will run for a fair amount of time, as it needs to decompile Minecraft for us. Thankfully, we’ll only need to do this once. You’ll know it’s done because it will say “BUILD SUCCESSFUL” if everything goes according to plan. This will setup our environment such that we are ready to modify Minecraft. Next we’ll need to run a final command:

> .\\gradlew eclipse

This command will set up an Eclipse project (which we’ll be working in) for us. This command will run a fair bit quicker, and when it’s done you should notice that the errors have vanished from our Eclipse project. Handy!

***EDIT (September 2019)]:*** You may find you are still having import errors at this point. This seems to happen for some readers but not others. I haven’t exactly figured out why, but it seems that removing your project from Eclipse and re-importing it may resolve the problem in some cases.

## [Step 5] Modifying Minecraft

If you haven’t had too much trouble following along with the setup phase of this tutorial, congratulations, we’re now ready to start modding Minecraft. You’ll notice that this Step 5 is quite lengthy. I wanted to comprehensively display how to add and customize a new block for you, don’t worry if it seems intimidating we’ll go through it step by step. For now, we’ll get started by making a custom block — don’t worry I’ll supply some textures so you don’t need to be a pixel artist just yet. In any case, you should now go ahead and open up your ExampleMod.java file by navigating to it in the Package Explorer pane.

You’ll notice that this code really isn’t doing much. That’s okay, we’ll add some of our own code to spruce things up a bit. Let’s start by removing that System.out.println() and creating a skeleton for a new private class. The code inside our ExampleMod class should now look like this:

\`\`\`java
public static final String MODID = "examplemod";
public static final String VERSION = "1.0";
@EventHandler
public void init(FMLInitializationEvent event)
{

}

private class ModBlock extends Block
{

}
\`\`\`

Read more at [https://buchananaubrey.medium.com/a-beginners-guide-to-modding-minecraft-9a42536495f6](https://buchananaubrey.medium.com/a-beginners-guide-to-modding-minecraft-9a42536495f6)`,
      },
      {
        id: 1,
      }
    );

    await queryInterface.bulkUpdate(
      "Posts",
      {
        mainText: `**Objective:** This guide will teach you how to develop and distribute an Electron.js application.

**Audience:** This guide is targeted at Electron beginners. It is strongly recommended that readers have at least fundamental knowledge of HTML/CSS and Node.js as the Electron framework is built around these items.

---

## Part 0: Understanding Electron

If you found this guide by wanting to develop cross platform applications then you probably know that Electron.js does just that. You can easily develop and distribute applications for windows/macOS/linux with the same code (bear in mind this does not include android or iOS).

The question becomes, “How does Electron accomplish this?”. In short; Electron launches a headless chromium browser which has access to the Node.js API via Electron’s own API. Which has plenty of use cases but, probably the biggest being is that your app can theoretically work without an internet connection.

If that sounded like a bunch of wumbo that’s okay but, it’s important to understand the Electron combines the browser and Node.js to create this seamless development experience for us.

## Part 1: Your first Electron App (AKA Hello World — again)

Inspired by the getting started page https://electronjs.org/docs/tutorial/first-app and assuming you have performed step 0 of [my previous guide](https://medium.com/@voltx180/a-beginners-guide-for-creating-command-line-programs-in-node-js-42d1ebfe9c08).

**Step 0.** Navigate to your project folder (you can just create a new folder wherever on your computer) and run the command \`npm init\` and follow the prompt provided

**Step 1.** NPM Install Electron by running \`npm install electron --save-dev\` *NOTE* we use --save-dev instead of --save so you can work on multiple apps with multiple electron version the future.

**Step 2.** Create two new files called \`index.js\` and \`index.html\`

**Step 3.** Inside index.js enter the following code:

\`\`\`js
const { app, BrowserWindow } = require(""electron"");
function createWindow() {
    // Create the browser window.
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });
    // and load the index.html of the app.
    win.loadFile(""index.html"");
}
app.on(""ready"", createWindow);
\`\`\``,
      },
      {
        id: 2,
      }
    );

    await queryInterface.bulkUpdate(
      "Posts",
      {
        mainText: `In machine learning, there is a theorem called “no free lunch.” In short, it states that no single algorithm works for all problems, especially in supervised learning (ie, predictive modeling).

For example, you can’t say that neural networks are always better than decision trees, and vice versa. There are many factors at work, such as the size and structure of the data set.

Therefore, you should experiment with a variety of different algorithms for specific problems and set aside a data “test set” to evaluate performance and select winners.

Of course, the algorithm you try must suit your problem, that is, choose the right machine learning task. For example, if you need to clean the house, you may use a vacuum cleaner, broom or mop, but you won’t take out the shovel and start digging.

## Machine learning overview

Machine learning is a branch of artificial intelligence, a science that researches machines to acquire new knowledge and new skills and to identify existing knowledge. The precise definition of machine learning is:

> It’s a computer program learning from experience \`E\` with respect to some task \`T\` and some performance measure \`P\`, if its performance on \`T\` as measured by \`P\`, improves with \`E\`: Tom Mitchell 1998

Machine learning has been widely used in data mining, computer vision, natural language processing, biometrics, search engines, medical diagnostics, detection of credit card fraud, securities market analysis, DNA sequence sequencing, speech and handwriting recognition, strategy games and robotics.`,
      },
      {
        id: 3,
      }
    );

    await queryInterface.bulkUpdate(
      "Posts",
      {
        mainText: `Lately, Python has become one of the most popular programming languages in the world, so popular that anybody knows at least a little bit of it. Its high versatility, together with the enormous amount of packages and libraries the community continues to provide, have made this programming language an all in one suite you will hardly resist.

The key characteristics that make Python so successful are many:

- It has one of the widest, if not the widest, collection of libraries of all programming languages.
- It is a simple programming language that both beginners and experts can use easily.
- It is highly portable.
- It has a simple high-level syntax compared with its competitors.

Many argue that the optimization is not that solid, and they prefer using C or C++. But if we consider versatility to be a must, then this programming language will never disappoint you.
When I first approached Python, the number of different libraries I found online astonished me. Anything I could think of, Python had a library to perform it. So I wish I had a guide on which libraries would have been the most useful to learn as a beginner and which to approach only in later stages.
Hopefully, this article will guide you through your choice, so let’s dive into the major libraries and packages of Python you could use in your code, starting with machine learning (Sections 1–6) and continuing with general-purpose libraries (Sections 7–14).

## 1. TensorFlow

\`\`\`py
import tensorflow as tf
\`\`\`

If you plan to work with machine learning, TensorFlow is the library you want to lean on. Developed directly by Google, this library is always updated and optimized, so besides performing amazingly, it is most needed when you interact directly with Google’s machine learning applications.

TensorFlow specializes in performing operations between large tensors that can build the typical graphs of a neural network. Also, since tensors are vectors, any application that uses vectors and matrices can take advantage of this popular and highly documented library.

Unlike most libraries, TensorFlow provides a data visualization feature that can work on any part of the graph. This property gives a considerable advantage in debugging the system and spotting the bottlenecks that need optimization.

Other minor pros of the library are its high modularity, which allows easiness in importing external blocks of code, and the possibility to train the models both on CPU and GPU, which is lately becoming relevant with the growth of the GPU speed. Also, TensorFlow allows parallelization of neural networks when possible, using different GPUs to train multiple neural networks.

You do not have to be worried about the learning curve neither! The large community using the library, plus the excellent developers of Google, have made this library one of the most well-documented and easy-to-learn out there.

## 2. Scikit-Learn

\`\`\`py
import sklearn
\`\`\`

The Scikit-Learn library is one of the best choices when your code needs to manage highly complex data. It usually works together with NumPy and SciPy, finding usage in a wide area, from statistics methods like the regression model to complex data science algorithms like the nearest neighbor.

With Scikit-Learn, you will have many machine learning algorithms at your disposal, plus the ability to perform high-cost tasks like clustering, principal component analysis, or training of unsupervised neural networks. You could also implement basic data mining and machine learning tasks like classification, regression, and clustering.

Another useful characteristic of the library is the possibility of extracting features from images and texts. Many algorithms use this library to extract regions of interest (ROIs) from images or meaningful words from an analyzed text. Despite this, we will discuss some special purpose libraries that address these specific problems later in the article.

## 3. NumPy

\`\`\`py
import numpy
\`\`\`

NumPy is the most popular machine learning library in Python, so popular that even TensorFlow uses it internally to manage its tensors.

The expertise of NumPy is working with vectors, both mono and multidimensional. The library contains both functions to manage and to operate with vectors in the most efficient way possible. It can perform complex mathematical operations like the Discrete Fourier Transform or more simplistic ones like linear algebra. Plus, it is highly accessible thanks to the intuitive name of its functions and its large quantities of documentation.`,
      },
      { id: 4 }
    );

    await queryInterface.bulkUpdate(
      "Posts",
      {
        mainText: `Once again I find myself swimming against the current of pop-culture to deliver a reality check most of you reading this are not going to want to hear: PHP, the bastard-child of programming languages, is more popular than ever!

Why? Why isn’t PHP dead already? There are so many “better” programming languages out there, right?

Well, no, there aren’t. Otherwise, they would have taken the lead and destroyed what PHP does eons ago. We need to reexamine our definition of what it means to be a “better” language.

If you’re scratching your head wondering why PHP isn’t dead or even dying, it’s likely because you probably don’t understand a few things about programming, programmers, markets, and democracy. Things that actually have nothing to do with code, functions, or syntax.

## It’s Vogue to Bash PHP

To make a name for yourself it in today’s programming circus of engineering cliques, you have to bash whatever language that is competing with whatever you have been taught to like. This isn’t about functionality, it’s about culture. Actually, it’s something more akin to religion.

Programmers are an opinionated lot. We’re arrogant. Get over it. We are. And we love to bash whatever languages we don’t like and don’t use. You can find engineers saying things like, “Java sucks. C# sucks. Go sucks.” It really doesn’t matter what the language is. They all get critiqued by everyone.

But it seems there’s an even deeper kind of disdain, even an unspoken rivalry bubbling up these days between PHP and Python; almost as if there’s some conspiracy within academia who would love to assassinate PHP and replace it with Python.

Even now you can find Wikipedia articles where the LAMP stack now magically includes Python. HUH? It wasn’t that way 20 years ago when I was using LAMP. PHP was the “P” in the LAMP acronym. It wasn’t Python or even Perl. I’m not saying things and definitions cannot change. Maybe I’m being a conspiracy theorist? Non-inclusive? Or is the Python crowd “culturally appropriating” our acronym?

For most of us, we learn Python in college along with a few other niche languages we’ll likely never use in the real world. We’re told by either our professors or other noobs that “PHP sucks!”, even though most of them have never written a single line of PHP professionally.`,
      },
      { id: 5 }
    );

    await queryInterface.bulkUpdate(
      "Posts",
      {
        mainText: `First thing is first! Go and download HTTrack!

www.httrack.com/page/2

HTTrack takes any website and makes a copy to your hard drive. This can be useful for searching for data on websites offline, gathering information useful for social engineering, or maybe even for replicating someones website and using it as a template page of your own. After extracting HTML and CSS from serveral sites one night I ended up hanging out with my friend Dan the Man and he and I began to edit the HTML, & CSS files occasionally taking breaks but before we knew it we had our own customized Webpage not only working on our system locally but also running on Github.com as well! Check it out! — → jayhill365.github.io . Follow the steps below and follow our Blogs for more Swag! — → lockboxx.blogspot.com — → jayhill365.github.io

The following tutorial will explain how to clone a website and then host it as your own website online for free!

1. Find a website suitable for cloning.
2. Open up a terminal and clone website using httrack. https://spin.atomicobject.com/2016/02/12/create-a-website-copy-with-httrack/
3. Open you favorite Sublime Text Editor and navigate to whatever folder you specified when you were using httrack to clone the html and css in.
4. After you edit necessary files open terminal and navigate back into where the cloned files are and launch a local webserver.
5. I launched a python webserver by typing: python -m SimpleHTTPServer 8080.
6. Next go to a browser and type in localhost:8080 to see if the cloned page works locally first.
7. If everything checks out okay locally the next step is to open up a browser and navigate to Github.com.
8. If you haven’t already create an account and then open up a new repository.
9. Name this repository your specific username then type in behind it github.io example; “username.github.io”
10. Update a Readme and then clone the repo to your desktop.
11. Edit the necessary cloned files that we got from httrack and then push these changes onto your new repository.
12. Wait about ten minutes the go to username.github.io and your page should be running!

Thanks for reading! Comments? Question?

Check Out our Blogs for more Swag! — → lockboxx.blogspot.com — → jayhill365.github.io`,
      },
      { id: 6 }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkUpdate(
      "Posts",
      {
        mainText: "asdf",
      },
      {}
    );
  },
};
