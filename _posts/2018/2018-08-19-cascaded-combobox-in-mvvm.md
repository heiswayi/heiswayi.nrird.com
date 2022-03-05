---
layout: post
title: How to create WPF cascaded combobox in MVVM
description: A simple .NET C# tutorial for creating WPF Cascaded ComboBox using MVVM design pattern.
tags: [C#, WPF, MVVM, Programming]
---

### What is MVVM?

MVVM is stand for Model-View-ViewModel. It's one of popular design patterns when working with .NET C# and WPF.

{%
    include figure.html 
    src="assets/images/kLUzCAs.gif" 
    caption="MVVM architecture"
%}

#### Descriptions

| Model | Application data model and business logic. |
| View | A collection of visible elements which includes user interface (UI), animations and text. |
| ViewModel | A binder that connects the UI elements to the controls in ViewModel. |



### Getting started

The easiest way to start as a MVVM-based project without using any MVVM library is to implement two interfaces;

- `INotifyPropertyChanged` - for any property binding
- `ICommand` - for any command binding

Here is how the project structure looked like:

```
Solution 'ComboBoxMVVMExample' (1 project)
└── ComboBoxMVVMExample
	├── Properties
	├── References
	├── Model
	├── View
	├── ViewModel
	|	├── RelayCommand.cs     <-- INotifyPropertyChanged
	|	└── ViewModelBase.cs    <-- ICommand
	├── App.config
	├── App.xaml
	└── MainWindow.xaml
```

#### Code snippets

These code snippets are reusable which you can copy and paste into your MVVM-based project.

ViewModelBase.cs:

```csharp
using System;
using System.ComponentModel;
using System.Diagnostics;

namespace ComboBoxMVVMExample.ViewModel
{
    public abstract class ViewModelBase : INotifyPropertyChanged
    {
        [Conditional("DEBUG")]
        [DebuggerStepThrough]
        public virtual void VerifyPropertyName(string propertyName)
        {
            if (TypeDescriptor.GetProperties(this)[propertyName] == null)
            {
                string msg = "Invalid property name: " + propertyName;
                if (this.ThrowOnInvalidPropertyName)
                    throw new Exception(msg);
                else
                    Debug.Fail(msg);
            }
        }
        protected virtual bool ThrowOnInvalidPropertyName { get; private set; }
        public virtual void RaisePropertyChanged(string propertyName)
        {
            this.VerifyPropertyName(propertyName);
            OnPropertyChanged(propertyName);
        }
        public event PropertyChangedEventHandler PropertyChanged;
        protected virtual void OnPropertyChanged(string propertyName)
        {
            this.VerifyPropertyName(propertyName);
            PropertyChangedEventHandler handler = this.PropertyChanged;
            if (handler != null)
            {
                var e = new PropertyChangedEventArgs(propertyName);
                handler(this, e);
            }
        }
    }
}
```

RelayCommand.cs:

```csharp
using System;
using System.Diagnostics;
using System.Windows.Input;

namespace ComboBoxMVVMExample.ViewModel
{
    public class RelayCommand : ICommand
    {
        readonly Action<object> _execute;
        readonly Predicate<object> _canExecute;

        public RelayCommand(Action<object> execute)
            : this(execute, null)
        {
        }
        public RelayCommand(Action<object> execute, Predicate<object> canExecute)
        {
            if (execute == null)
                throw new ArgumentNullException("execute");

            _execute = execute;
            _canExecute = canExecute;
        }
        [DebuggerStepThrough]
        public bool CanExecute(object parameters)
        {
            return _canExecute == null ? true : _canExecute(parameters);
        }
        public event EventHandler CanExecuteChanged
        {
            add { CommandManager.RequerySuggested += value; }
            remove { CommandManager.RequerySuggested -= value; }
        }
        public void Execute(object parameters)
        {
            _execute(parameters);
        }
    }
}
```



### Creating a View

Project structure:

```
Solution 'ComboBoxMVVMExample' (1 project)
└── ComboBoxMVVMExample
	├── Properties
	├── References
	├── Model
	├── View
	|	└── ComboBox.xaml    <--
	├── ViewModel
	|	├── RelayCommand.cs
	|	└── ViewModelBase.cs
	├── App.config
	├── App.xaml
	└── MainWindow.xaml
```

ComboBox.xaml:

```xml
<UserControl x:Class="ComboBoxMVVMExample.View.ComboBox"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006">
    <StackPanel Orientation="Vertical">
        <StackPanel Orientation="Horizontal" Margin="10">
            <Label Content="Get Enum items: " Margin="0 0 10 0" Width="120"/>
            <ComboBox Width="120" ItemsSource="{Binding EnumItems}" SelectedItem="{Binding EnumSelectedItem}" Margin="0 0 10 0"/>
            <Button Content="Show Selected Item" Command="{Binding ShowEnumItemCommand}"/>
        </StackPanel>

        <StackPanel Orientation="Horizontal" Margin="10">
            <Label Content="Get Country list: " Margin="0 0 10 0" Width="120"/>
            <ComboBox Width="120" ItemsSource="{Binding CountryList}" DisplayMemberPath="CountryName" SelectedValue="{Binding SelectedCountryCode}" SelectedValuePath="CountryTwoLetterCode" Margin="0 0 10 0"/>
            <Label Content="{Binding SelectedCountryCode}"/>
        </StackPanel>

        <StackPanel Orientation="Horizontal" Margin="10">
            <Label Content="Get State list: " Margin="0 0 10 0" Width="120"/>
            <ComboBox Width="120" ItemsSource="{Binding StateList}" DisplayMemberPath="StateName" SelectedValue="{Binding SelectedState}" SelectedValuePath="StateName" IsEnabled="{Binding AllowStateSelection}" Margin="0 0 10 0"/>
            <Label Content="{Binding SelectedState}"/>
        </StackPanel>
    </StackPanel>
</UserControl>
```

The code above contains 3 ComboBox elements. The first ComboBox is for `enum`-type list. This is just an example of binding the `ICommand` interface from _RelayCommand.cs_ file. The other two ComboBox elements are an example of the cascaded ComboBox using `List<T>` class.

#### Common properties of WPF ComboBox

| SelectedItem | Return a selected object from a list of objects. |
| SelectedValue | Used with `SelectedValuePath` to hold a selected object. |
| SelectedValuePath | Used with `SelectedValue` to return a selected property value from an object from `SelectedValue`. |
| DisplayMemberPath | Return a selected property value to display on the UI. |

#### Example of UI snapshot

{%
    include figure.html 
    src="assets/images/OjRjTdJ.png" 
    caption="UI snapshot"
%}



## Creating a Model

Project structure:

```
Solution 'ComboBoxMVVMExample' (1 project)
└── ComboBoxMVVMExample
	├── Properties
	├── References
	├── Model
	|	└── ExampleModel.cs    <--
	├── View
	|	└── ComboBox.xaml
	├── ViewModel
	|	├── RelayCommand.cs
	|	└── ViewModelBase.cs
	├── App.config
	├── App.xaml
	└── MainWindow.xaml
```

ExampleModel.cs:

```csharp
using ComboBoxMVVMExample.ViewModel; // ViewModelBase.cs
using System;
using System.Collections.Generic; // List<Country>

namespace ComboBoxMVVMExample.Model
{
    public class ExampleModel
    {
    }

    public enum EnumItem
    {
        Enum01,
        Enum02,
        Enum03
    }

    public class Country
    {
        public string CountryName { get; set; }
        public string CountryTwoLetterCode { get; set; }

        public List<Country> getCountries()
        {
            List<Country> returnCountries = new List<Country>();
            returnCountries.Add(new Country() { CountryName = "United States", CountryTwoLetterCode = "US" });
            returnCountries.Add(new Country() { CountryName = "Malaysia", CountryTwoLetterCode = "MY" });
            returnCountries.Add(new Country() { CountryName = "India", CountryTwoLetterCode = "IN" });
            return returnCountries;
        }
    }

    public class State
    {
        public string CountryTwoLetterCode { get; set; }
        public string StateName { get; set; }

        public List<State> getStatesCollection()
        {
            List<State> returnStates = new List<State>();
            returnStates.Add(new State() { CountryTwoLetterCode = "US", StateName = "New York" });
            returnStates.Add(new State() { CountryTwoLetterCode = "US", StateName = "Alaska" });
            returnStates.Add(new State() { CountryTwoLetterCode = "US", StateName = "West Virginia" });
            returnStates.Add(new State() { CountryTwoLetterCode = "MY", StateName = "Kelantan" });
            returnStates.Add(new State() { CountryTwoLetterCode = "MY", StateName = "Pulau Pinang" });
            returnStates.Add(new State() { CountryTwoLetterCode = "MY", StateName = "Selangor" });
            returnStates.Add(new State() { CountryTwoLetterCode = "IN", StateName = "Mumbai" });
            return returnStates;
        }

        public List<State> getStateByCountryCode(string countryCode)
        {
            List<State> stateList = new List<State>();
            foreach (State currentState in getStatesCollection())
            {
                if (currentState.CountryTwoLetterCode == countryCode)
                {
                    stateList.Add(new State() { CountryTwoLetterCode = currentState.CountryTwoLetterCode, StateName = currentState.StateName });
                }
            }
            return stateList;
        }
    }
}
```

From the code above, there are 3 object classes; **EnumItem**, **Country**, and **State**. 

- `CountryName`, `CountryTwoLetterCode` and `StateName` are the properties of the respective object classes (Country and State).
- `getCountries()` and `getStatesCollection()` are the instantiation methods used to get a list of Country and State respectively.
- `getStateByCountryCode(...)` is a method to get a list of states based on a particular country's two-letter code.
- `EnumItem` class is just an example of a list using the enum type.



## Creating a ViewModel

Project structure:

```
Solution 'ComboBoxMVVMExample' (1 project)
└── ComboBoxMVVMExample
	├── Properties
	├── References
	├── Model
	|	└── ExampleModel.cs
	├── View
	|	└── ComboBox.xaml
	├── ViewModel
	|	├── ExampleViewModel.cs    <--
	|	├── RelayCommand.cs
	|	└── ViewModelBase.cs
	├── App.config
	├── App.xaml
	└── MainWindow.xaml
```

ExampleViewModel.cs:

```csharp
using ComboBoxMVVMExample.Model; // ExampleEnum
using System;
using System.Collections.Generic; // IEnumerable
using System.Windows; // MessageBox
using System.Windows.Input; // ICommand
using System.Collections.ObjectModel; // ObservableCollection<Country>


namespace ComboBoxMVVMExample.ViewModel
{
    /// <summary>
    /// This class inherits from ViewModelBase class
    /// </summary>
    public class ExampleViewModel : ViewModelBase
    {
        #region ComboBox using enum type
        // Private Fields
        private IEnumerable<EnumItem> _EnumItems;
        private string _EnumSelectedItem;
        private ICommand _ShowEnumItemCommand;

        // Public Properties - Used for binding with the View
        public IEnumerable<EnumItem> EnumItems
        {
            get {
                // Whatever type of the enum, return them the same too
                return (EnumItem[])Enum.GetValues(typeof(EnumItem));
            }
            set
            {
                if (value != _EnumItems)
                {
                    _EnumItems = value;
                    OnPropertyChanged("EnumItems");
                }
            }
        }
        public string EnumSelectedItem
        {
            get { return _EnumSelectedItem; }
            set
            {
                _EnumSelectedItem = value;
                OnPropertyChanged("EnumSelectedItem");
            }
        }
        public ICommand ShowEnumItemCommand
        {
            get
            {
                _ShowEnumItemCommand = new RelayCommand(
                    param => ShowEnumItemMethod()
                );
                return _ShowEnumItemCommand;
            }
        }

        // Private Method
        private void ShowEnumItemMethod()
        {
            // Get combobox current selected value
            MessageBox.Show(EnumSelectedItem);
        }
        #endregion

        #region Cascaded ComboBox using List<T> class
        // Private Fields
        private List<Country> _CountryList;
        private string _SelectedCountryCode;
        private List<State> _StateList;
        private string _SelectedState;

        // Public Properties - Used for binding with the View
        public List<Country> CountryList {
            get { return _CountryList; }
            set
            {
                _CountryList = value;
                OnPropertyChanged("CountryList");
            }
        }
        public string SelectedCountryCode
        {
            get { return _SelectedCountryCode; }
            set
            {
                _SelectedCountryCode = value;
                OnPropertyChanged("SelectedCountryCode");
                OnPropertyChanged("AllowStateSelection"); // Trigger Enable/Disable UI element when particular country is selected
                getStateList(); // Generate a new list of states based on a selected country
            }
        }
        public List<State> StateList
        {
            get { return _StateList; }
            set
            {
                _StateList = value;
                OnPropertyChanged("StateList");
            }
        }
        public string SelectedState
        {
            get { return _SelectedState; }
            set
            {
                _SelectedState = value;
                OnPropertyChanged("SelectedState");
            }
        }
        public bool AllowStateSelection
        {
            get { return (SelectedCountryCode != null); }
        }

        // Constructor
        public ExampleViewModel()
        {
            // Instantiate, get a list of countries from the Model
            Country _Country = new Country();
            CountryList = _Country.getCountries();
        }

        // Private Method
        private void getStateList()
        {
            // Instantiate, get a list of states based on selected country two-letter code from the Model
            State _State = new State();
            StateList = _State.getStateByCountryCode(SelectedCountryCode);
        }
        #endregion
    }
}
```

The public properties in the code above are usually used to bind with the _View_. In order for the _ViewModel_ to participate in two-way data binding with the _View_, the setter property must raise the **PropertyChanged** event using `OnPropertyChanged("PropertyName");` method.

_ViewModel_ satisfies this requirement by implementing the [INotifyPropertyChanged](https://msdn.microsoft.com/en-us/library/system.componentmodel.inotifypropertychanged.aspx) interface and raising the **PropertyChanged** event when a property is changed. Listeners can respond appropriately to the property changes when they occur. You may refer to ViewModelBase.cs file on how it was implemented.



### Connecting the ViewModel to the View

There are many approaches to connect a _ViewModel_ to a _View_, including direct relations or container-based approach. However, all share the same goal, which is for the _View_ to have a _ViewModel_ assigned to its **DataContext** property. _View_ can be connected to _ViewModel_ in a code-behind file (C#), or in the _View_ itself (XAML).

In this example, I connected the _ViewModel_ from the _View_ itself without touching its code-behind file. I used MainWindow.xaml file as the main window UI for this example:

```xml
<Window x:Class="ComboBoxMVVMExample.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:view="clr-namespace:ComboBoxMVVMExample.View"
        xmlns:viewModel="clr-namespace:ComboBoxMVVMExample.ViewModel"
        Title="MainWindow" Height="350" Width="525">
    <Window.DataContext>
        <viewModel:ExampleViewModel/>
    </Window.DataContext>
    <Grid>

    </Grid>
</Window>
```

From the XAML code above, I added two new namespaces called `view` and `viewModel`. From there, I was able to use `Window.DataContext` to point to the `ExampleViewModel` class (the _ViewModel_).

Here's the final code for MainWindow.xaml file after I included the _View_ from ComboBox.xaml file:

```xml
<Window x:Class="ComboBoxMVVMExample.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:view="clr-namespace:ComboBoxMVVMExample.View"
        xmlns:viewModel="clr-namespace:ComboBoxMVVMExample.ViewModel"
        Title="MainWindow" Height="350" Width="525">
    <Window.DataContext>
        <viewModel:ExampleViewModel/>
    </Window.DataContext>

    <Grid>
        <StackPanel Orientation="Vertical" HorizontalAlignment="Center" VerticalAlignment="Center">
            <view:ComboBox/>
        </StackPanel>
    </Grid>

</Window>
```



### Final result

{%
    include figure.html 
    src="assets/images/LlC4BmP.png" 
    caption="Cascaded ComboBox demo"
%}

After it was successfully compiled, at first nothing was selected, so the ComboBox for **State** will be disabled by default. But, whenever I started to select a **Country** e.g. "Malaysia", the ComboBox for **State** will be automatically enabled, instantiated and a list of example states within "Malaysia" will be populated. This is how the cascaded ComboBox works with the MVVM implementation.

### MVVM benefits

MVVM enables a great developer-designer workflow which is providing following benefits:

| 1. | During the development process, developers and designers can work more independently and concurrently on their components. The designers can concentrate on the _View_, and if they are using Expression Blend, they can easily generate sample data to work with, while the developers can work on the _ViewModel_ and _Model_ components. |
| 2. | The developers can create unit tests for the _ViewModel_ and the _Model_ without using the _View_. The unit tests for the _ViewModel_ can exercise exactly the same functionality as used by the _View_. |
| 3. | It is easy to redesign the UI of the application without touching the business logic code because the _View_ is implemented entirely in XAML. A new version of the _View_ should work with the existing _ViewModel_. |
| 4. | If there is an existing implementation of the _Model_ that encapsulates existing business logic, it may be difficult or risky to change. In this scenario, the _ViewModel_ acts as an adapter for the _Model_ classes and enables you to avoid making any major change to the _Model_ code. |

### Complete source code

The complete source code for this example project can be downloaded from [GitHub](https://github.com/heiswayi/ComboBoxMVVMExample).