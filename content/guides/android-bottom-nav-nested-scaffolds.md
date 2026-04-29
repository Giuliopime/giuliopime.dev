---
title: Bottom Navigation Bar with nested Scaffolds
description: Implement a Bottom Navigation Bar without nesting Scaffolds
date: 2023-08-20
project: index
tags: [jetpack-compose]
---
On the Android developer documentation there is a guide on [how to integrate the bottom navigation bar into your app](https://developer.android.com/jetpack/compose/navigation#bottom-nav), which uses a top level `Scaffold` and a `NavHost` as its content.

## The problem
The issue I encountered with this setup is the fact that it’s hard to nest material 3 scaffolds in the `NavHost` as they might end up with weird paddings around the edges, especially when managing insets yourself with `WindowCompat.setDecorFitsSystemWindows(window, false)` in your activity.  

Nesting scaffolds is often necessary when you need to add different top app bars or floation action buttons depending on the screen, and moving that conditional logic to the main scaffold often requires view models filled with ui properties that shouldn’t be there.  

## My approach
I’ve tried multiple solutions, and the one that worked best for me was to replace to top level `Scaffold` with a simple `Column` and add the `NavHost` and `BottomAppBar` to it!  

## Code
```kotlin
@Composable
fun BottomAppBarScreen() {
    val navController = rememberNavController()
    val pages = listOf(BottomAppBarPage.Feed, BottomAppBarPage.Account, BottomAppBarPage.Settings)
    var selectedPage by remember { mutableStateOf(BottomAppBarPage.Account.route) }

    Column(
        verticalArrangement = Arrangement.Bottom,
        modifier = Modifier.fillMaxSize().background(MaterialTheme.colorScheme.background)
    ) {
        NavHost(
            navController = navController,
            startDestination = BottomAppBarPage.Account.route,
            modifier = Modifier.weight(1f)
        ) {
            composable(BottomAppBarPage.Feed.route) {
                Text(text = "Feed")
            }

            composable(BottomAppBarPage.Account.route) {
                AccountPage()
            }

            composable(BottomAppBarPage.Settings.route) {
                Text(text = "Settings")
            }
        }

        CustomBottomAppBar(
            pages = pages,
            selectedPage = selectedPage,
            onPageClicked = {
                selectedPage = it
                navController.navigate(it) {
                    popUpTo(navController.graph.findStartDestination().id) {
                        saveState = true
                    }
                    launchSingleTop = true
                    restoreState = true
                }
            }
        )
    }
}
```

The `BottomAppBarPage` is a simple sealed class which code you can find [here](https://github.com/Giuliopime/jetpack-demos/blob/main/app/src/main/java/dev/giuliopime/jetpackdemos/demos/bottomAppBar/BottomAppBarPage.kt), while the `CustomBottomAppBar` code is [here](https://github.com/Giuliopime/jetpack-demos/blob/main/app/src/main/java/dev/giuliopime/jetpackdemos/demos/bottomAppBar/CustomBottomAppBar.kt).  

Then, a possible page could look like this:
```kotlin
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AccountPage() {
    Scaffold(
        topBar = {}, // a custom top app bar...
        floatingActionButton = {}, // a custom fab...
        // This removes the system navigation bar padding which we have already handled in the top level screen
        contentWindowInsets = ScaffoldDefaults.contentWindowInsets.exclude(NavigationBarDefaults.windowInsets)
    ) { paddingValues ->  
        LazyColumn(
            modifier = Modifier.fillMaxWidth().padding(paddingValues),
            verticalArrangement = Arrangement.spacedBy(
                space = 4.dp
            )
        ) {
            items(50) {
                Text(text = "Item $it")
            }
        }
    }
}
```

The trick here is **telling the Scaffold to ignore the navigation bar window insets**, these do not refer to the bottom app bar but to the system navigation bar.    
If we don’t tell that to the Scaffold, it will think that we didn’t handle those insets and will add a bottom padding as high as the system navigation bar.  

You can see that I preserved the default Scaffold insets and removed just the ones we don’t need, the navigation bar insets.  

```kotlin
contentWindowInsets = ScaffoldDefaults.contentWindowInsets.exclude(NavigationBarDefaults.windowInsets)
```

## Demo & code
![BottomNavigationBar demo](/img/blog/android/bottom-navigation-bar.gif "BottomNavigationBar demo")  

You can find the full code for the demo in this article on my [GitHub repo](https://github.com/Giuliopime/jetpack-demos/tree/main)  

## Bonus - animations
After publishing this article I realised animations were missing, or didn’t work well with the default settings.  

The `NavHost` now has animations support, so I changed each composable enter and exit animations to match its position in the Bottom Navigation Bar.  

Here is the updated `NavHost`

```kotlin
NavHost(
    navController = navController,
    startDestination = BottomAppBarPage.Account.route,
    modifier = Modifier.weight(1f)
) {
    composable(
        route = BottomAppBarPage.Feed.route,
        enterTransition = {
            slideIntoContainer(AnimatedContentTransitionScope.SlideDirection.Right)
        },
        exitTransition = {
            slideOutOfContainer(AnimatedContentTransitionScope.SlideDirection.Left)
        }
    ) {
        Text(text = "Feed")
    }

    composable(
        route = BottomAppBarPage.Account.route,
        enterTransition = {
            if (initialState.destination.route == BottomAppBarPage.Settings.route) {
                slideIntoContainer(AnimatedContentTransitionScope.SlideDirection.Right)
            } else {
                slideIntoContainer(AnimatedContentTransitionScope.SlideDirection.Left)
            }
        },
        exitTransition = {
            if (targetState.destination.route == BottomAppBarPage.Settings.route) {
                slideOutOfContainer(AnimatedContentTransitionScope.SlideDirection.Left)
            } else {
                slideOutOfContainer(AnimatedContentTransitionScope.SlideDirection.Right)
            }
        }
    ) {
        AccountPage()
    }

    composable(
        route = BottomAppBarPage.Settings.route,
        enterTransition = {
            slideIntoContainer(AnimatedContentTransitionScope.SlideDirection.Left)
        },
        exitTransition = {
            slideOutOfContainer(AnimatedContentTransitionScope.SlideDirection.Right)
        }
    ) {
        Text(text = "Settings")
    }
}
```

Happy coding ;)