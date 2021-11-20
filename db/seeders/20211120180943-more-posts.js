"use strict";

const { randomDate } = require("../../utils/date-utils");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    if (newPosts.length !== newPostsComments.length) {
      throw new Error(
        `newPosts (${newPosts.length}) and newPostsComments (${newPostsComments.length}) arrays should be equal length`
      );
    }

    const startDate = new Date(2021, 10, 1);

    const postsToSave = newPosts.map((post) => {
      const date = randomDate(startDate, new Date());
      post.createdAt = date;
      post.updatedAt = date;
      return post;
    });

    await queryInterface.sequelize.transaction(async (transaction) => {
      const savedPosts = await queryInterface.bulkInsert("Posts", postsToSave, {
        returning: true,
        transaction,
      });

      await Promise.all(
        newPostsComments.map(async (newPostComments, i) => {
          const newComments = newPostComments.map((comment) => {
            comment.postId = savedPosts[i].id;

            const date = randomDate(startDate, savedPosts[i].createdAt);
            comment.createdAt = date;
            comment.updatedAt = date;
            return comment;
          });
          if (newComments.length) {
            await queryInterface.bulkInsert("Comments", newComments, {
              transaction,
            });
          }
        })
      );
    });
  },

  down: async (queryInterface, Sequelize) => {
    await Promise.all(
      newPosts.map(async (post) => {
        await queryInterface.bulkDelete(
          "Posts",
          {
            userId: post.userId,
            heading: post.heading,
          },
          {}
        );
      })
    );
  },
};

/* TEMPLATE
{
  userId: 0,
  heading: "",
  subText: "",
  headerImage: "",
  mainText: ``,
},
*/
const newPosts = [
  {
    userId: 2,
    heading: "API Architecture — Design Best Practices for REST APIs",
    subText: "REST APIs everywhere!",
    headerImage:
      "https://miro.medium.com/max/700/1*Mb7u8eGMNNjPqDnoFR5OUA.jpeg",
    mainText: `In general, web services have been in existence for just as long as the HTTP protocol has existed. But, since the beginning of cloud computing, they have become the ubiquitous method of enabling client interaction with services and data.

As a developer, I have been lucky enough to work with some SOAP services that are still around @ work. But, I’ve largely played with **REST**, which is a resource-based architectural style for developing APIs and web services.

For a great chunk of my career, **I have been involved in projects either building, designing, and using APIs.**

Most of the APIs I have seen “claimed” to be **“RESTful”** — *meaning compliant with the principles and constraints of REST architecture.*

Yet, there are a few handful I have worked with that **give REST a very, very bad rep.**

Inaccurate usage of HTTP status codes, plain text responses, inconsistent schemas, verbs in endpoints… **I feel like I’ve seen it all** (or at least, a good chunk).

So, I decided to write up a piece describing what I personally think are some **best practices when it comes to designing REST APIs.**

## Just so we’re clear…

I do not claim to be the authority, or mean to infer that the following practices are 100% in sync with any “holy REST principles” (if there even is such a thing in existence). I have pieced these thoughts from my own experiences building, and working with different APIs throughout my career.

Also, I do not pretend to have mastered REST API design, either! I believe it is an **art/sport** — the more you practice, the better you get.
I will list out some code snippets as “examples of bad design”. If they look like something you would write, that’s fine! 🙂 The only thing that matters is that we learn together.

Here are some tips, advice, and guidance to designing great REST APIs that will make your consumers (*and developers*) happy.

## 1. Learn the basics of HTTP

## 2. Do not return plain text

## 3. Do not use verbs in URIs

## 4. Use plural nouns for resources

## 5. Return the error details in the response body

## 6. Pay special attention to HTTP status codes

## 7. You should use HTTP status codes consistently

## 8. Do not nest resources

## 9. Handle trailing slashes gracefully

## 10. Make use of the querystring for filtering and pagination

## 11. Know the difference between \`401 Unauthorized\` and \`403 Forbidden\`

## 12. Make good use of HTTP \`202 Accepted\`

## 13. Use a web framework specialized in REST APIs

---

[Full Article](https://abdulrwahab.medium.com/api-architecture-best-practices-for-designing-rest-apis-bf907025f5f)`,
  },
  {
    userId: 2,
    heading: "Software Architecture Cheat Sheet for Daily Usage",
    subText: "Software Architecture smells and heuristics",
    headerImage: "https://miro.medium.com/max/700/0*9pSwY0DPAZphD1O-",
    mainText: `Having clean software architecture and staying conform to pre-defined design principles from start of the project is one of the best ways to avoid possible technical debt in the future of that software system. Clean Software Design is a key point for an effective software product.
Let us have a look at some important principles, rules, guidelines that ensure a clean software design:

*Principles:*

1. *Loose Coupling* — if classes use each other, they are coupled together. The less classes are coupled, the easier is to change them.
2. *High Cohesion* — degree to which elements of a whole belong together. Components of the class should be highly cohesive.
3. *Locality* — Changes, maintenance, extensions are only local. This leads to no harming whole environment.
4. *Removeable* — Software Components should be easily removeable.
5. *Small Components* — software system should be only of small components ideally each doing only one task.

*Class Design:*

1. *Single Responsibility Principle (SRP)* — class should do only one task.
2. *Open Closed Principle (OCP)* — class should be extended not modified.
3. *Liskov Substitution Principle (LSP)* — child classes must be able to replace their super classes.
4. *Dependency Inversion Principle (DIP)* — dependeny is reversed: high level components are free of low-level components.
5. *Interface Segregation Principle (ISP)* — interfaces should be small: classes should not implement unnecessary methods.

*Cohesion Principles:*

1. *Release Reuse Equivalency Principle (RREP)* — only together releaseable components should be bundled together.
2. *Common Closure Principle (CCP)* — classes that change together should be bundled together.
3. *Common Reuse Principle (CRP)* — classes that are used together should be bundled together.

*Coupling Principles:*

1. *Acyclic Dependencies Principle (ADP)* — no dependency cycles.
2. Stable Dependencies Principle (SDP) — depend on direction of stability.
3. Stable Abstractions Principle (SAP) — the more abstract, the more stable.

*High-Level Architecture:*

1. *Keep Configurable Data at High Levels* — constants or config datas should be kept in high level.
2. *Don’t Be Inconsistent* — have a convention, principle, rule or guidelines and always follow them.
3. *Prefer Polymorphism To If/Else or Switch/Case.*
4. *Separate Multi-Threading Code* — isolate multi-thread from rest of the code.
5. *Only one level of Abstraction per layer* — stay conform to existing abstraction layers.
6. *Fields Not Defining State* — fields holding data that does not belong to the state of the instance but are to hold temporary data. Use local variables or extract to a class abstracting the performed action.
7. *Micro Layers* — avoid unnecessary design layers.
8. *Singletons / Service Locator* — Make use of dependency injection.
9. *Base Classes Depending On Their Derivatives* — Base classes should work with any derived class.
10. *Feature Envy* — The methods of a class should be interested in the variables and functions of the class they belong to, and not the variables and functions of other classes. Using accessors and mutators of some other object to manipulate its data, is envying the scope of the other object ©.
11. *Unused Coupling* — avoid unused dependencies, be greedy.
12. *Hidden Coupling* — make sure that order of calls to different methods are correct.
13. *Transitive Navigation* — (Law of Demeter), write isolated code. Classes should have access to only its direct dependencies.

*Environment:*

1. *Project Build Requires Only One Step.*
2. *Executing Tests Requires Only One Step.*
3. *Source Control System* — Always use a source control system.
4. *Continuous Integration* — Assure integrity with Continuous Integration.
5. *Overridden Logs*— Do not override warnings, errors, exception handling

[Original Post](https://azeynalli1990.medium.com/software-architecture-cheat-sheet-for-daily-usage-9923922ea75b)`,
  },
  {
    userId: 3,
    heading: "Microservices are Dead — Long Live Miniservices",
    subText:
      "Are you really using microservices for your application? Think again.",
    headerImage:
      "https://miro.medium.com/max/1400/1*QRIP8-Nh4qjLINPXKEFtjg.jpeg",
    mainText: `*Disclaimer alert: this is going to be one of those purists articles that explain how you’re not doing what you think you’re doing simply because you don’t really know the full definition of what you think you’re doing.*

If you’re OK with that, then we can go on.

Have you ever defined or implemented a microservices-based architecture? You’re probably wrong about that. I’m sorry, but today I’m playing the role of the “definition police”.

What you’re most likely dealing with are not microservices, but instead: Miniservices. Let’s try to cover why that is and why it’s OK to be wrong about it.

---

## Microservices, Miniservices, they’re all small services, aren’t they?

I mean, yes, you’re not wrong about that, in fact, that’s not where the confusion happens.

We tend to think about “microservices” as small, very logic-focused services that deal with, usually, one responsibility. However, if we look at [Martin Fowler’s definition of Microservices](https://www.martinfowler.com/articles/microservices.html) — and you know, he’s a very smart guy, so we usually like to know what he thinks — you’ll notice we’re missing a very small, yet key, trait about microservices: *decoupled*.

Let’s take a closer look at what we’re calling “microservice”. This term gets thrown around so much these days that is getting to a point where it’s exactly like teenage sex: everyone talks about it, nobody really knows how to do it, everyone thinks everyone else is doing it, so everyone claims they are doing it.

Truth be told, from 99% of the interviews I take as a manager, when I ask about microservices I get responses about REST APIs. And no, they’re not necessarily the same thing.

And by definition, REST APIs alone can’t be microservices, even if you split them up into multiple smaller ones, each taking care of a single responsibility. They can’t, because by definition for you to be able to use a REST API directly, you need to know about it.

As a related side-note: There are two types of REST developers (meaning devs creating REST APIs):

- The ones that implement as many features about REST as they think they need. Meaning that they might care about resource-oriented URLs if they feel like it, and maybe they will worry about their APIs being stateless since it’s not that hard to implement. But this type of developer will 99,9% of the time ditch the HATEOAS (Hypermedia As The Engine of Application State). In other words, self-discoverability of the structure of the API is no longer a feature, the client and the server have a hard-coded contract between the two of them.
- The ones that follow the REST standard to the letter. I think I’ve only seen one developer like this in my experience — so if you’re like this, please drop a comment and let’s connect! — . Implementing REST APIs this way can take a lot longer, but the result is a lot better, especially because clients have very little coupling with the server, all they need to know about is where it is and what’s the root endpoint. The rest is done through self-discoverability, very cool.

However, in both cases, the coupling between client and server is still there. You can’t get a decoupled communication JUST through REST, and that is why, if we’re strict with the definition of microservice — and we’re trying to be— they can’t be called like that.

So instead, let’s loosen up the belt of definition, leave ourselves some wiggle room and call these services: miniservices.

So we can define a **miniservice** as:

Small-ish enough services (usually APIs) to be considered “mini”, they still need to take care of only one single responsibility, however, we’re not too worry about the “decoupled with the client” part.

Granted, the less coupled they are the better it’ll be for future changes, having a dynamic client will definitely help adjust faster and without much impact upon changes on the server. That’s definitely a plus, but it’s not part of our definition.

---

**Tip: Build with independent components, for speed and scale**

Instead of building monolithic apps, build independent components first and compose them into services and applications. It makes development faster and helps teams build more consistent and scalable applications.

OSS Tools like [Bit](https://bit.dev/) offer a great developer experience for building independent components and composing applications. Many teams start by building their Design Systems or Micro Frontends, through independent components.

![](https://miro.medium.com/max/2000/1*zGUo5gijshzi_iKEgxg1Ow.png)

[Read Full Article](https://blog.bitsrc.io/microservices-are-dead-long-live-miniservices-40e4ccf4741)`,
  },
  {
    userId: 1,
    heading: "5 Difficult Skills That Pay Off Exponentially in Programming",
    headerImage: "https://miro.medium.com/max/1400/0*-uDlbLDFztHRKgl9",
    mainText: `If you are a good-grasper and a productive coder, great! You can impress people in no time. Your career graph will be surely remarkable.

But age-old wisdom says that there are things in life that must be taken at a slow pace. They might be difficult to learn.

But when you master them, you command a position no one can take away. When done right, such things create drastically positive changes in your life.

Look at the following diagram:

![](https://miro.medium.com/max/2400/0*DlMHBPXo9ubG6tM3.png)

We are talking about the green line.

I describe 5 things that can create exponential growth in your programming career.

## #1: Tinkering with Toys:

What do toys (hardware gadgets) have to do with programming?

When I was 8, I broke my digital watch (price < $0.75) to see how time controls work. It took me 2 days to reassemble it. And still, I couldn’t figure out what was the connection between the circuitry and the digits on the LCD panel.

It made me rent magazines that showed device diagrams and circuit designs. That reading triggered me to understand the bigger concepts of **interface and architecture** in engineering.

Those paths led me to study Electronics, which finally gave me my programming career. Starting from a software servicing firm, I quickly moved into product companies. I am still a programmer after 20 years.

If I wasn’t intrigued by digital machines since that age, I wouldn’t love coding enough. I wouldn’t be fearless of the failures that occur at every step a machine part is wrongly connected.

I would have turned into a despicable manager (that most of my friends have become) long ago.

Maybe I am still a work in progress. But take this: Almost every successful tech entrepreneur of today (Elon Musk, Jeff Bezos, Larry Page, Steve Jobs — you name it) has tinkered with toys endlessly in childhood.

Three great things about this activity are:

- It doesn’t have to be difficult.
- It has to be voluntary (So [don’t push your kids into coding schools](https://medium.com/an-idea/why-you-should-not-enroll-your-kids-to-coding-classes-3387d6688b20) yet.) Though one can create/move into an environment to fuel it.
- **Most important:** It has to be persistent. Break it, then don’t stop until you fix it. Persistence fuels the long-lasting hunger for problem-solving and building. This hunger is your most vital asset in surviving the ruthless software industry.

If you have never built a gadget before, try attending a gadget hackathon. Don’t feel judged. If you are not comfortable, order an Arduino at home and build sensors at home. Choose someone who is equally eager to accompany you (preferably, a kid).

## #2: Challenging Oneself:

If building gadgets could build persistence, you also need to utilize this virtue. The constant challenge does it for you.

> Challenging oneself is about going one step ahead in handling complexity without being told.

Challenging yourself does not mean tackling programming challenges (algorithmic puzzles), but they are one way to do it. While I generally advise against stressful competitive programming, if algorithms are your true calling, it is only pragmatic that you aim FAAMG+. Those challenges are extremely helpful in gamifying your journey.

Challenging yourself isn’t akin to troubleshooting also. Because when you are troubleshooting, trouble is already present. Challenging yourself is a proactive step.

Challenging oneself is about going one step ahead in handling complexity without being told.

Let’s say you wrote a function that reads a set of variables from a predefined config file. The implementation will include a hardcoded file name (e.g. “myfile.config”). Its interface is as follows:

\`\`\`
func readParams()
\`\`\`

To challenge yourself, soon after you write this function, you could parameterize it to accept the config file name (with a default argument that is hardcoded file name).

\`\`\`
func readParams(filename: String="myfile.config")
\`\`\`

Just think how many possibilities this small change opens up:

- Your client developer or end-user could change the config params at runtime. As a result, you must reload the executable code. So you must optimize that code and encapsulate it in an initialize() function that gets called at the beginning + every time the config file is changed.
- Assuming the config file relates to a user, there is also a possibility of supporting more than one user with the same application installation.
- You would also think of making an **export()** function that exports the read params to disk, network, database, or an external messaging system (email etc.). You could import it elsewhere using **readParams()**. This way, the application is portable across machines. Portability = Better value proposition = More and sustained client base.

If you didn’t challenge yourself and shipped V1 with the no-params signature, no one would blame you. No bugs would be raised, too.

But then, imagine users liking your V1, enjoying your free trial with 5-star rating, and wanting more. They want all of the above use cases in V2, or they will cancel the free trial.

Now, since you have a foot in the door, it will be impossible to go back. And it will be time-consuming & bug-prone to refactor **readParams()** calls. This means more test cases are updated, too. V2 could be a complete mess.

Challenging oneself is the truest definition of ambition in any field, not just programming. An ambitious programmer constantly challenges himself at work (and in the side projects), instead of chasing tags, promotional cabins, and the privileges that come with it.

If you look at any successful company, they are working as technical cofounders or CTOs.

If it takes time for you, do not bother. Everyone learns at a different pace. The important thing is that you take baby steps at every line you type or paste.

Stop romanticizing the guy who types complex code faster than you. He is doing it because he has done it before, in a much worse way, and a thousand times. You can be that too.

The important thing to remember is that it’s not the goal, but a side effect of challenging oneself.

---

[Full Article](https://levelup.gitconnected.com/5-difficult-skills-that-pay-off-exponentially-in-programming-702a599c636e)`,
  },
  {
    userId: 6,
    heading: "What’s New in TypeScript 4.5?",
    subText: "Awaited Type, type-only modifier, import assertions, and more",
    headerImage:
      "https://miro.medium.com/max/1400/1*k69ANfBEggLKA5G258OjHQ.png",
    mainText: `The TypeScript \`4.5\` version was released on the 17th of November 🎉. It’s been a long time since a TypeScript release was so packed. It is an exciting one.

It is the first attempt to bring ES Modules to the NodeJs world under an experimental version.

That’s not the only area that has got attention. A lot of improvements are coming in the imports area. They will bring more readability and control on how we want to import our types and variables.

Let’s see the major changes of this release below.

## The Awaited Type

Prior to this release to get the return type of a Promise you would have to use the \`infer\` functionality, shown below:

\`\`\`ts
type Unwrap<T> = T extends PromiseLike<infer U> ? U : T;

const resultPromise = Promise.resolve(true);
// ✅ resultUnwrapType is boolean 
type resultUnwrapType = Unwrap<typeof resultPromise>;
\`\`\`

As part of this release, there is a new type \`Awaited\` shipped. You don’t need a custom mapped type like the \`Unwarp\` in the above snippet. We can simply do the following:

\`\`\`ts
type resultUnwrapType = Awaited<typeof reAvailable only under nightly releasessultPromise>;
\`\`\`

The utility has the following capabilities:

- Recursive unwrap
- Doesn’t rely on \`PromiseLike\` to be more robust
- Non-promise “thenables” resolve to never
- Adds overloads to \`Promise.all\`, \`Promise.race\`, \`Promise.allSettled\`, and \`Promise.any\` to leverage to \`Awaited<T>\`

Let’s see some different use case examples:

\`\`\`ts
// ✅ type is string
type basic = Awaited<Promise<string>>;

// ✅ type is string
type recursive = Awaited<Promise<Promise<string>>>;

// ✅ type is boolean
type nonThenObj = Awaited<boolean>;

// ✅ type is string | Date
type unions = Awaited<Date | Promise<Promise<string>>>;

type FakePromise = { then: () => string };
// ✅ type is never
type fake = Awaited<FakePromise>;
\`\`\`

---

[Full Article](https://betterprogramming.pub/whats-new-in-typescript-4-5-57d6b88b1e72)`,
  },
  {
    userId: 4,
    heading: "It is nice to use public keyword in TypeScript",
    mainText: `On default, properties and methods of a class are public in TypeScript. So, you don’t have to add a public keyword. However, it is pleasant to use that keyword. Because based on OOP rules, properties and methods should be private on default. By using public keyword for public members you make it visible what members are in fact public, and also that you have exposed them willingly, and not by accident.`,
  },
  {
    userId: 1,
    heading: "Python + JavaScript = 🔥🔥🔥",
    headerImage: "https://miro.medium.com/max/1400/0*hyegkDyp9SaJjfNl.png",
    mainText: `When it comes to Web Development nothing beats JavaScript. But sometimes we have to do a bit more demanding task, for example analyzing a big pile of data. In that case, Python might be a superior option. But that’s just one function of our website. Do we want to switch to Python just because of that one feature? Probably not.

## So what if we could build our backend mostly using NodeJS and only use Python when we have to.

That would be awesome right? We can use \`child process\` in Node.JS to run a python script when needed.

\`\`\`js
const spawn = require('child_process').spawn
app.get("process_data", (req, res) => {
    spawn('python3', ['script.py'])
})

# script.py
doSometing()
\`\`\`

And if we want we can **pass data to our python script** also.

\`\`\`js
const spawn = require('child_process').spawn
app.get("process_data", (req, res) => {
    const msg = "Hello"
    spawn('python3', ['script.py', msg])
})
\`\`\`

In Python, in order to be able to read the data, you **must import** the **sys** module.

\`\`\`py
import sys, json

def main():
    msg = sys.argv[1]
    doSometing(msg)

if __name__ == '__main__':
    main()
\`\`\`

Now instead of passing data while spawning the Python process, let's send data in the stream.

\`\`\`py
const spawn = require('child_process').spawn,
const py = spawn('python3', ['script.py'])
const data = {
    msg: "Hello"
}

py.stdin.write(JSON.stringify(data)) //we have to send data as a string, so we are using JSON.stringify
py.stdin.end()

import sys, json

def main():
    lines = sys.stdin.readlines()
    data = json.loads(lines)
    doSometing(data['msg'])

if __name__ == '__main__':
    main()
\`\`\`

Finally, we can send the response back to our nodejs from the python script

\`\`\`
const spawn = require('child_process').spawn
const py = spawn('python3', ['cscript.py'])

py.stdout.on('data', function(res){
    let data = JSON.parse(res.toString())
    console.log(data)
})

import sys

# You will have your own implementation of get data. In this case lets assume it returns a dict/json
res = getData()
print(json.dumps(data))

sys.stdout.flush()
\`\`\`

So this article has come to an end. But make sure you check out my other articles.

---

[Original Article](https://blog.aman.wiki/python-javascript-87806d26a395)`,
  },
  {
    userId: 5,
    heading:
      "How an Anti-TypeScript “JavaScript Developer” Like Me Became a TypeScript Fan",
    subText: "My journey from not liking TypeScript to loving it",
    headerImage: "https://miro.medium.com/max/1400/0*o_VAe9UO3Ys1gBBk",
    mainText: `In this article, I will discuss my journey from being an anti-TypeScript developer to a developer who now couldn’t think of going back to the plain JavaScript world. Maybe my thoughts can help someone who is in the same boat as I was in a few years back.

---

## Why Was I Anti-TypeScript?

I always felt that adding types to functions/variables and satisfying the TypeScript compiler was over-engineering and didn’t provide any meaningful benefits. Also, it felt slow to work on, as I would always get compilation errors that were hard to understand. I would scratch my head trying to figure out the problem. This caused some frustration, and I started hating TypeScript.

The other reason was advanced TypeScript concepts like [generics](https://www.typescriptlang.org/docs/handbook/generics.html). They were very hard to understand and I started feeling like I was in the Java world, where every piece of code is strongly typed and overwhelming. Even simple code like the snippet below scared me when I started learning TypeScript:

![](https://miro.medium.com/max/1400/1*ccNIwcBOISh4ZJ7kAuaY4A.png)

Because of these reasons, even though I was learning TypeScript by watching tutorials or reading books, I never worked on any enterprise application that was written in TypeScript. In fact, I used to choose JavaScript over TypeScript (if there was a choice) for take-home assignments as part of the interview process with companies.

However, when I moved to my current role, working on JavaScript was not an option, as all the apps that I was going to work on were written in TypeScript (with only legacy code in JavaScript). As expected, it was initially overwhelming for me and my hate for TypeScript was increasing. But after a couple of months, I eventually understood the benefits and reasons why someone should prefer TypeScript over JavaScript. I have listed them in the following section.

---

## Top 3 Reasons Why I Became a TypeScript Fan

### 1. Making impossible states impossible and exhaustive checks

This is the major reason why I love TypeScript. If you would like to know more about this concept, I recommend watching the video below. It talks about the Elm language, but the concept is valid for the TypeScript world as well: https://www.youtube.com/watch?v=IcgmSRJHu_8

If you want to see some examples of how to leverage TypeScript in your React applications to avoid impossible states, I would recommend reading the following articles:

1. [A real-life example of how a traffic light system would take care of impossible states](https://zohaib.me/leverage-union-types-in-typescript-to-avoid-invalid-state/)
2. [A React component with loading, loaded, and error states](https://dev.to/housinganywhere/matching-your-way-to-consistent-states-1oag)

### 2. Spotting bugs early

While working on JavaScript, I encountered multiple instances where bugs were spotted in production due to some corner case that happened because there was no type checking on the frontend. These bugs can be avoided and caught at compile time by the TypeScript compiler, which will save you hours in the DEV-QA cycle.

With TypeScript, everything stays the way it was initially defined. If a variable is declared as a boolean, it will always be a boolean and won’t turn into a number. This enhances the likelihood of code working the way it was initially intended to. In short, the code is predictable!

### 3. Rich IDE support and ease of refactoring

> “Information about types makes editors and Integrated development environments (IDE) much more helpful. They can offer features like code navigation and autocompletion, providing accurate suggestions. You also get feedback while typing: The editor flags errors, including type-related as soon as they occur. All this helps you write maintainable code and results in a significant productivity boost.” — [AltexSoft](https://www.altexsoft.com/blog/typescript-pros-and-cons/)

If we’re talking about refactoring, like introducing a new state or getting rid of an unwanted state that is being used across the app, the TypeScript compiler will complain if you forget to update some references. You can be confident about your refactoring and that the app will work the same way as it did before refactoring.

---

## Conclusion

There are many other benefits to moving to TypeScript (if you haven’t already done so), but these were the main points that made me a TypeScript fan.

If you are a TypeScript beginner or would like to improve your knowledge, here are some books I can recommend:

1. [TypeScript in 50 Lessons](https://www.amazon.com/gp/product/B08NT8VM5M/)
2. [Tackling TypeScript](https://exploringjs.com/tackling-ts/)

Cheers!

---

[Original Article](https://betterprogramming.pub/how-an-anti-typescript-javascript-developer-like-me-became-a-typescript-fan-a4e043151ad7)`,
  },
];

// Each index should be an array of comments that pair to a post in newPosts
/* COMMENT TEMPLATE
postId and dates will be filled out automatically
{
  userId: 0,
  content: "",
}
*/
const newPostsComments = [
  [
    {
      userId: 2,
      content:
        "If you liked this story, you sohuld check out my other one on why Bonsole is the greatest package ever!",
    },
    {
      userId: 1,
      content: "Conventions are so boring",
    },
    {
      userId: 6,
      content: "BONSOLE!",
    },
    {
      userId: 3,
      content: "Very informative! Thanks!",
    },
  ],
  [
    {
      userId: 1,
      content: "So handy!!!",
    },
  ],
  [
    {
      userId: 4,
      content: "I dont really agree with you. Microservices are way better.",
    },
    {
      userId: 5,
      content: "TOTALLY AGREE!",
    },
  ],
  [],
  [
    {
      userId: 2,
      content: "Excited for these new features!",
    },
  ],
  [],
  [
    {
      userId: 2,
      content: "Sounds cool, I'll have to give this a try!",
    },
  ],
  [],
];
